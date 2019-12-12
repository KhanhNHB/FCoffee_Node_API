import { keys, omit } from "lodash";
import { NotFoundError } from "routing-controllers";
import { isUndefined } from "util";
import { ProductService } from "../../../product/services";
import { DaoBillInfo } from "../daos";
import { BillInfoDao } from "../daos/BillInfoDao";
import { BillInfo } from "./models/BillInfo";
import { BillInfoCreation } from "./models/BillInfoCreation";
import { BillInfoUpdation } from "./models/BillInfoUpdation";
import { ModelUtils } from "../../../utils";
import { BillInfoDetail } from "./models/BillInfoDetail";

export class BillInfoService {
    billInfoDao: BillInfoDao;

    constructor() {
        this.billInfoDao = new BillInfoDao();
    }

    async getBillInfos(): Promise<any> {
        return await this.billInfoDao.getBillInfos();
    }

    async getBillInfoById(id: string): Promise<BillInfo> {
        const daoBillInfo = await this.billInfoDao.getBillInfoById(id);
        if (isUndefined(daoBillInfo) || !daoBillInfo) {
            throw new NotFoundError(`Not found bill by id ${id}`);
        }
        const billInfo = new BillInfo().toBillInfo(daoBillInfo);
        return billInfo;
    }

    async getBillInfoByBillId(id: string): Promise<any> {
        const daoBillInfos = await this.billInfoDao.getBillInfoByBillId(id);
        if (isUndefined(daoBillInfos) || !daoBillInfos) {
            return null;
        }
        return daoBillInfos;
    }

    async getBillInfoDetailByBillId(id: string): Promise<any> {
        const productService = new ProductService();

        const daoBillInfos = await this.billInfoDao.getBillInfoByBillId(id);
        if (isUndefined(daoBillInfos) || !daoBillInfos) {
            return null;
        }

        let bill_infos_detail: BillInfoDetail[] = [];
        for (const daoBillInfo of daoBillInfos) {
            const product = await productService.getProductById(daoBillInfo.product_id);
            const billInfoDetail = new BillInfoDetail().toBillInfoDetail(product);
            billInfoDetail.quantity = daoBillInfo.quantity;
            billInfoDetail.total_price = daoBillInfo.quantity * daoBillInfo.price;

            bill_infos_detail.push(billInfoDetail);

        }
        return bill_infos_detail;
    }

    async getBillInfoByBillIdAndProductId(bill_id: string, product_id: string): Promise<BillInfo> {
        const daoBillInfo = await this.billInfoDao.getBillInfoByBillIdAndProductId(bill_id, product_id);
        if (isUndefined(daoBillInfo) || !daoBillInfo) {
            throw new NotFoundError(`Not found bill info by bill id ${bill_id} and product id ${product_id}`);
        }
        const billInfo = new BillInfo().toBillInfo(daoBillInfo);
        return billInfo;
    }

    async create(req: BillInfoCreation): Promise<Boolean> {
        // TODO: Authorize
        const productService = new ProductService();

        const bill_id = req.bill_id;
        const product_id = req.product_id;
        const daoBillInfo = new DaoBillInfo().toDaoBillInfo(req);

        const product = await productService.getProductById(product_id);

        const billInfos = await this.getBillInfoByBillId(bill_id);
        if (isUndefined(billInfos) || !billInfos.length) {
            return await this.billInfoDao.create(daoBillInfo);
        }

        const current_product_ids: string[] = [];
        billInfos.map((billInfo: BillInfo) => {
            current_product_ids.push(billInfo.product_id);
        });

        const found = current_product_ids.find(product_id => {
            return product_id == product.id;
        });

        if (found) {
            const billInfo = await this.getBillInfoByBillIdAndProductId(bill_id, found);
            let origin_quantity = billInfo.quantity;

            if (!req.is_plus && !req.is_sub) {
                origin_quantity = origin_quantity + req.quantity;
            } else {
                origin_quantity = req.quantity;
            }
            daoBillInfo.quantity = origin_quantity;
            await this.billInfoDao.update(daoBillInfo)
        } else {
            await this.billInfoDao.create(daoBillInfo)
        }

        return true;
    }

    async update(req: BillInfoUpdation): Promise<Boolean> {
        // TODO: Authorized
        const billInfo = await this.getBillInfoById(req.id);
        const daoBillInfo = new DaoBillInfo().toDaoBillInfo(billInfo);
        const daoBillInfoUpdated = ModelUtils.assign(daoBillInfo, req);

        await this.billInfoDao.update(daoBillInfoUpdated);

        return true;
    }

    async updateStatus(bill_id: string, product_id: string): Promise<Boolean> {
        const billInfos = await this.getBillInfoByBillId(bill_id);

        const product_ids: string[] = [];
        for (const billInfo of billInfos) {
            product_ids.push(billInfo.product_id);
        }


        const found = product_ids.find((item_product_id: string) => {
            return product_id === item_product_id;
        });

        if (found) {
            await this.billInfoDao.updateStatus(bill_id, found);
        }



        return true;
    }
}