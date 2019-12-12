import { InternalServerError, NotFoundError } from "routing-controllers";
import { isUndefined } from "util";
import { AuthToken } from "../../auth/services/models/AuthToken";
import { BillInfoService } from "../../bill/billInfo/services";
import { BillInfoCreation } from "../../bill/billInfo/services/models/BillInfoCreation";
import { BillService } from "../../bill/services";
import { BillCreation } from "../../bill/services/models/BillCreation";
import { BillDetail } from "../../bill/services/models/BillDetail";
import { BillUpdation } from "../../bill/services/models/BillUpdation";
import { ProductService } from "../../product/services";
import { ProductDetail } from "../../product/services/models/ProductDetail";
import { ProductOrder } from "../../product/services/models/ProductOrder";
import { TableDao } from "../daos/TableDao";
import { Table } from "./models/Table";
import { TableDetail } from "./models/TableDetail";
import { TableUpdation } from "./models/TableUpdation";
import { sortBy, parseInt } from "lodash";
import { DaoTable } from "../daos";
import { Product } from "../../product/services/models/Product";
import { ModelUtils } from "../../utils";
import { BillInfo } from "../../bill/billInfo/services/models/BillInfo";
import { TableRemoveProductItem } from "./models/TableRemoveProductItem";

export class TableService {
    tableDao: TableDao;

    constructor() {
        this.tableDao = new TableDao();
    }

    async getTables(): Promise<any> {
        return await this.tableDao.getTables();
    }

    async getTableById(id: string): Promise<Table> {
        const daoTable = await this.tableDao.getTableById(id);
        if (isUndefined(daoTable) || !daoTable) {
            throw new NotFoundError(`Not found table by id ${id}`);
        }
        const table = new Table().toTable(daoTable);
        return table;
    }

    async getTableDetail(id: string): Promise<TableDetail> {
        const billService = new BillService();
        const billInfoService = new BillInfoService();
        const productService = new ProductService();

        const daoTable = await this.getTableById(id);
        if (daoTable.available) {
            return new TableDetail();
        }

        const bill = await billService.getBillByTableId(id);

        const billInfos = await billInfoService.getBillInfoByBillId(bill.id);

        let productOrders: ProductOrder[] = [];
        for (const billInfo of billInfos) {
            let productOrder = ModelUtils.assign(new ProductOrder(), billInfo);
            productOrder.id = billInfo.product_id;

            productOrders.push(productOrder);
        };

        const products: ProductDetail[] = [];
        for (const productOrder of productOrders) {
            const product = await productService.getProductById(productOrder.id);
            const productDetail = new ProductDetail().toProductDetail(product);

            productDetail.quantity = productOrder.quantity;
            products.push(productDetail);
        };

        const billDetail = new BillDetail().toBillDetail(bill);
        const tableDetail = new TableDetail().toTableDetail(daoTable);

        tableDetail.bill = billDetail;
        tableDetail.products = products;

        return tableDetail;
    }

    async getTableByName(name: string): Promise<Table> {
        const daoTable = await this.tableDao.getTableByName(name);

        if (isUndefined(daoTable) || !daoTable) {
            throw new NotFoundError(`Not found table by name ${name}`);
        }

        const table = new Table().toTable(daoTable);

        return table;
    }

    async getTableNames(): Promise<any> {
        const table_names = await this.tableDao.getTableNames();

        if (!table_names.length || isUndefined(table_names)) {
            throw new NotFoundError(`Not found list table name is empty`);
        }

        const table_numbers: any[] = [];
        table_names.forEach((table_name: any) => {
            const number = table_name.name.split(' ');
            table_numbers.push(parseInt(number[1]));
        });

        const numbers = sortBy(table_numbers);

        return numbers;
    }

    async create(auth: AuthToken): Promise<Boolean> {
        // TODO: Authorized
        // TODO: Check validate
        const numbers = await this.getTableNames();

        const daoTable = new DaoTable();
        daoTable.name = "Bàn " + numbers[numbers.length - 1] + 1;
        await this.tableDao.create(daoTable);

        return true;
    }

    async checkIn(req: TableUpdation, auth: any): Promise<Boolean> {
        const billService = new BillService();
        const billInfoService = new BillInfoService();

        const current_user = auth.data.username;

        // TODO: Authorized
        // create bill
        const products = req.products;
        if (!products.length) {
            return false;
        }
        const table_id = req.id;
        const table = await this.getTableById(table_id);

        if (table.available) {
            const billCreation = new BillCreation();
            billCreation.table_id = req.id;
            billCreation.created_by_id = current_user;

            const billCreated = await billService.create(billCreation);
            if (!billCreated) {
                throw new InternalServerError("Create bill fail!");
            }
        }

        const bill = await billService.getBillByTableId(table_id);

        let total = bill.total;
        // create bill info
        for (const product of products) {
            const billInfo = new BillInfoCreation().toBillInfoCreation(product);
            billInfo.product_id = product.id;
            billInfo.bill_id = bill.id;
            billInfo.is_plus = product.is_plus;
            billInfo.is_sub = product.is_sub;

            const calculate_product_quantity = product.quantity;
            if (billInfo.is_plus && !billInfo.is_sub) {
                total = total + this.calculatePrice(1, product.price);
            } else if (!billInfo.is_plus && billInfo.is_sub) {
                total = total - this.calculatePrice(1, product.price);
            } else {
                total = total + this.calculatePrice(calculate_product_quantity, product.price);
            }

            await billInfoService.create(billInfo);
        }

        const billUpdate = new BillUpdation();
        billUpdate.id = bill.id;
        billUpdate.total = total;
        billUpdate.created_by_id = current_user;

        await billService.update(billUpdate);

        return await this.tableDao.updateAvailable(table_id, false);
    }

    calculatePrice(currentQuantity: number, unitPrice: number): number {
        return currentQuantity * unitPrice;
    }

    async checkOut(id: string, auth: any): Promise<Boolean> {
        const billService = new BillService();

        const table = await this.getTableById(id);
        const bill = await billService.getBillByTableId(id);
        const billUpdation = new BillUpdation().toBillUpdation(bill);
        billUpdation.paid = true;
        billUpdation.created_by_id = auth.data.username;

        const billUpdated = await billService.update(billUpdation);
        if (!billUpdated) {
            throw new InternalServerError(`Updated bill paid fail!`);
        }
        const result = await this.tableDao.updateAvailable(table.id, true);
        return result;
    }

    async deleteProductItem(req: TableRemoveProductItem, auth: AuthToken): Promise<Boolean> {
        const billService = new BillService();
        const billInfoService = new BillInfoService();

        const bill_id = req.bill_id;

        const table = await this.getTableById(req.table_id);
        const billInfo = await billInfoService.updateStatus(req.bill_id, req.product_id);

        let bill = await billService.getTotalBillById(bill_id);

        let total = bill.total;
        const price_product_item_deleted = req.product_price * req.product_quantity;

        total = total - price_product_item_deleted;

        await billService.updateTotalById(bill_id, total);
        return true;
    }

}