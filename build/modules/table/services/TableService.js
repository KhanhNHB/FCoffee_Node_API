"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const util_1 = require("util");
const services_1 = require("../../bill/billInfo/services");
const BillInfoCreation_1 = require("../../bill/billInfo/services/models/BillInfoCreation");
const services_2 = require("../../bill/services");
const BillCreation_1 = require("../../bill/services/models/BillCreation");
const BillDetail_1 = require("../../bill/services/models/BillDetail");
const BillUpdation_1 = require("../../bill/services/models/BillUpdation");
const services_3 = require("../../product/services");
const ProductDetail_1 = require("../../product/services/models/ProductDetail");
const ProductOrder_1 = require("../../product/services/models/ProductOrder");
const TableDao_1 = require("../daos/TableDao");
const Table_1 = require("./models/Table");
const TableDetail_1 = require("./models/TableDetail");
const lodash_1 = require("lodash");
const daos_1 = require("../daos");
const utils_1 = require("../../utils");
class TableService {
    constructor() {
        this.tableDao = new TableDao_1.TableDao();
    }
    getTables() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.tableDao.getTables();
        });
    }
    getTableById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const daoTable = yield this.tableDao.getTableById(id);
            if (util_1.isUndefined(daoTable) || !daoTable) {
                throw new routing_controllers_1.NotFoundError(`Not found table by id ${id}`);
            }
            const table = new Table_1.Table().toTable(daoTable);
            return table;
        });
    }
    getTableDetail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const billService = new services_2.BillService();
            const billInfoService = new services_1.BillInfoService();
            const productService = new services_3.ProductService();
            const daoTable = yield this.getTableById(id);
            if (daoTable.available) {
                return new TableDetail_1.TableDetail();
            }
            const bill = yield billService.getBillByTableId(id);
            const billInfos = yield billInfoService.getBillInfoByBillId(bill.id);
            let productOrders = [];
            for (const billInfo of billInfos) {
                let productOrder = utils_1.ModelUtils.assign(new ProductOrder_1.ProductOrder(), billInfo);
                productOrder.id = billInfo.product_id;
                productOrders.push(productOrder);
            }
            ;
            const products = [];
            for (const productOrder of productOrders) {
                const product = yield productService.getProductById(productOrder.id);
                const productDetail = new ProductDetail_1.ProductDetail().toProductDetail(product);
                productDetail.quantity = productOrder.quantity;
                products.push(productDetail);
            }
            ;
            const billDetail = new BillDetail_1.BillDetail().toBillDetail(bill);
            const tableDetail = new TableDetail_1.TableDetail().toTableDetail(daoTable);
            tableDetail.bill = billDetail;
            tableDetail.products = products;
            return tableDetail;
        });
    }
    getTableByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const daoTable = yield this.tableDao.getTableByName(name);
            if (util_1.isUndefined(daoTable) || !daoTable) {
                throw new routing_controllers_1.NotFoundError(`Not found table by name ${name}`);
            }
            const table = new Table_1.Table().toTable(daoTable);
            return table;
        });
    }
    getTableNames() {
        return __awaiter(this, void 0, void 0, function* () {
            const table_names = yield this.tableDao.getTableNames();
            if (!table_names.length || util_1.isUndefined(table_names)) {
                throw new routing_controllers_1.NotFoundError(`Not found list table name is empty`);
            }
            const table_numbers = [];
            table_names.forEach((table_name) => {
                const number = table_name.name.split(' ');
                table_numbers.push(lodash_1.parseInt(number[1]));
            });
            const numbers = lodash_1.sortBy(table_numbers);
            return numbers;
        });
    }
    create(auth) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Authorized
            // TODO: Check validate
            const numbers = yield this.getTableNames();
            const daoTable = new daos_1.DaoTable();
            daoTable.name = "Bàn " + numbers[numbers.length - 1] + 1;
            yield this.tableDao.create(daoTable);
            return true;
        });
    }
    checkIn(req, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            const billService = new services_2.BillService();
            const billInfoService = new services_1.BillInfoService();
            const current_user = auth.data.username;
            // TODO: Authorized
            // create bill
            const products = req.products;
            if (!products.length) {
                return false;
            }
            const table_id = req.id;
            const table = yield this.getTableById(table_id);
            if (table.available) {
                const billCreation = new BillCreation_1.BillCreation();
                billCreation.table_id = req.id;
                billCreation.created_by_id = current_user;
                const billCreated = yield billService.create(billCreation);
                if (!billCreated) {
                    throw new routing_controllers_1.InternalServerError("Create bill fail!");
                }
            }
            const bill = yield billService.getBillByTableId(table_id);
            let total = bill.total;
            // create bill info
            for (const product of products) {
                const billInfo = new BillInfoCreation_1.BillInfoCreation().toBillInfoCreation(product);
                billInfo.product_id = product.id;
                billInfo.bill_id = bill.id;
                billInfo.is_plus = product.is_plus;
                billInfo.is_sub = product.is_sub;
                const calculate_product_quantity = product.quantity;
                if (billInfo.is_plus && !billInfo.is_sub) {
                    total = total + this.calculatePrice(1, product.price);
                }
                else if (!billInfo.is_plus && billInfo.is_sub) {
                    total = total - this.calculatePrice(1, product.price);
                }
                else {
                    total = total + this.calculatePrice(calculate_product_quantity, product.price);
                }
                yield billInfoService.create(billInfo);
            }
            const billUpdate = new BillUpdation_1.BillUpdation();
            billUpdate.id = bill.id;
            billUpdate.total = total;
            billUpdate.created_by_id = current_user;
            yield billService.update(billUpdate);
            return yield this.tableDao.updateAvailable(table_id, false);
        });
    }
    calculatePrice(currentQuantity, unitPrice) {
        return currentQuantity * unitPrice;
    }
    checkOut(id, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            const billService = new services_2.BillService();
            const table = yield this.getTableById(id);
            const bill = yield billService.getBillByTableId(id);
            const billUpdation = new BillUpdation_1.BillUpdation().toBillUpdation(bill);
            billUpdation.paid = true;
            billUpdation.created_by_id = auth.data.username;
            const billUpdated = yield billService.update(billUpdation);
            if (!billUpdated) {
                throw new routing_controllers_1.InternalServerError(`Updated bill paid fail!`);
            }
            const result = yield this.tableDao.updateAvailable(table.id, true);
            return result;
        });
    }
    deleteProductItem(req, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            const billService = new services_2.BillService();
            const billInfoService = new services_1.BillInfoService();
            const bill_id = req.bill_id;
            const table = yield this.getTableById(req.table_id);
            const billInfo = yield billInfoService.updateStatus(req.bill_id, req.product_id);
            let bill = yield billService.getTotalBillById(bill_id);
            let total = bill.total;
            const price_product_item_deleted = req.product_price * req.product_quantity;
            total = total - price_product_item_deleted;
            yield billService.updateTotalById(bill_id, total);
            return true;
        });
    }
}
exports.TableService = TableService;
