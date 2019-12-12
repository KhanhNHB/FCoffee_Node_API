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
const services_1 = require("../../../product/services");
const daos_1 = require("../daos");
const BillInfoDao_1 = require("../daos/BillInfoDao");
const BillInfo_1 = require("./models/BillInfo");
const utils_1 = require("../../../utils");
const BillInfoDetail_1 = require("./models/BillInfoDetail");
class BillInfoService {
    constructor() {
        this.billInfoDao = new BillInfoDao_1.BillInfoDao();
    }
    getBillInfos() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.billInfoDao.getBillInfos();
        });
    }
    getBillInfoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const daoBillInfo = yield this.billInfoDao.getBillInfoById(id);
            if (util_1.isUndefined(daoBillInfo) || !daoBillInfo) {
                throw new routing_controllers_1.NotFoundError(`Not found bill by id ${id}`);
            }
            const billInfo = new BillInfo_1.BillInfo().toBillInfo(daoBillInfo);
            return billInfo;
        });
    }
    getBillInfoByBillId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const daoBillInfos = yield this.billInfoDao.getBillInfoByBillId(id);
            if (util_1.isUndefined(daoBillInfos) || !daoBillInfos) {
                return null;
            }
            return daoBillInfos;
        });
    }
    getBillInfoDetailByBillId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const productService = new services_1.ProductService();
            const daoBillInfos = yield this.billInfoDao.getBillInfoByBillId(id);
            if (util_1.isUndefined(daoBillInfos) || !daoBillInfos) {
                return null;
            }
            let bill_infos_detail = [];
            for (const daoBillInfo of daoBillInfos) {
                const product = yield productService.getProductById(daoBillInfo.product_id);
                const billInfoDetail = new BillInfoDetail_1.BillInfoDetail().toBillInfoDetail(product);
                billInfoDetail.quantity = daoBillInfo.quantity;
                billInfoDetail.total_price = daoBillInfo.quantity * daoBillInfo.price;
                bill_infos_detail.push(billInfoDetail);
            }
            return bill_infos_detail;
        });
    }
    getBillInfoByBillIdAndProductId(bill_id, product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const daoBillInfo = yield this.billInfoDao.getBillInfoByBillIdAndProductId(bill_id, product_id);
            if (util_1.isUndefined(daoBillInfo) || !daoBillInfo) {
                throw new routing_controllers_1.NotFoundError(`Not found bill info by bill id ${bill_id} and product id ${product_id}`);
            }
            const billInfo = new BillInfo_1.BillInfo().toBillInfo(daoBillInfo);
            return billInfo;
        });
    }
    create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Authorize
            const productService = new services_1.ProductService();
            const bill_id = req.bill_id;
            const product_id = req.product_id;
            const daoBillInfo = new daos_1.DaoBillInfo().toDaoBillInfo(req);
            const product = yield productService.getProductById(product_id);
            const billInfos = yield this.getBillInfoByBillId(bill_id);
            if (util_1.isUndefined(billInfos) || !billInfos.length) {
                return yield this.billInfoDao.create(daoBillInfo);
            }
            const current_product_ids = [];
            billInfos.map((billInfo) => {
                current_product_ids.push(billInfo.product_id);
            });
            const found = current_product_ids.find(product_id => {
                return product_id == product.id;
            });
            if (found) {
                const billInfo = yield this.getBillInfoByBillIdAndProductId(bill_id, found);
                let origin_quantity = billInfo.quantity;
                if (!req.is_plus && !req.is_sub) {
                    origin_quantity = origin_quantity + req.quantity;
                }
                else {
                    origin_quantity = req.quantity;
                }
                daoBillInfo.quantity = origin_quantity;
                yield this.billInfoDao.update(daoBillInfo);
            }
            else {
                yield this.billInfoDao.create(daoBillInfo);
            }
            return true;
        });
    }
    update(req) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Authorized
            const billInfo = yield this.getBillInfoById(req.id);
            const daoBillInfo = new daos_1.DaoBillInfo().toDaoBillInfo(billInfo);
            const daoBillInfoUpdated = utils_1.ModelUtils.assign(daoBillInfo, req);
            yield this.billInfoDao.update(daoBillInfoUpdated);
            return true;
        });
    }
    updateStatus(bill_id, product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const billInfos = yield this.getBillInfoByBillId(bill_id);
            const product_ids = [];
            for (const billInfo of billInfos) {
                product_ids.push(billInfo.product_id);
            }
            const found = product_ids.find((item_product_id) => {
                return product_id === item_product_id;
            });
            if (found) {
                yield this.billInfoDao.updateStatus(bill_id, found);
            }
            return true;
        });
    }
}
exports.BillInfoService = BillInfoService;
