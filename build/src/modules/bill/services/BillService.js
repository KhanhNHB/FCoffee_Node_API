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
exports.BillService = void 0;
const routing_controllers_1 = require("routing-controllers");
const util_1 = require("util");
const services_1 = require("../../table/services");
const utils_1 = require("../../utils");
const daos_1 = require("../daos");
const BillDao_1 = require("../daos/BillDao");
const Bill_1 = require("./models/Bill");
const BillByCurrentStaff_1 = require("./models/BillByCurrentStaff");
class BillService {
    constructor() {
        this.billDao = new BillDao_1.BillDao();
    }
    getBills() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.billDao.getBills();
        });
    }
    getBillById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const daoBill = yield this.billDao.getBillById(id);
            if (util_1.isUndefined(daoBill) || !daoBill) {
                throw new routing_controllers_1.NotFoundError(`Not found bill by id ${id}`);
            }
            const bill = new Bill_1.Bill().toBill(daoBill);
            return bill;
        });
    }
    getBillByCurrentUser(auth) {
        return __awaiter(this, void 0, void 0, function* () {
            const tableService = new services_1.TableService();
            const daoBills = yield this.billDao.getBillByCurrentUser(auth.data.username);
            if (util_1.isUndefined(daoBills) || !daoBills.length) {
                throw new routing_controllers_1.NotFoundError(`Not found bill by user ${auth.data.username}`);
            }
            let billsByCurrentStaff = [];
            for (const daoBill of daoBills) {
                const table = yield tableService.getTableById(daoBill.table_id);
                const billByCurrentStaff = new BillByCurrentStaff_1.BillByCurrentStaff().toBillByCurrentStaff(daoBill);
                billByCurrentStaff.table_name = table.name;
                billsByCurrentStaff.push(billByCurrentStaff);
            }
            const result = billsByCurrentStaff.sort((a, b) => {
                return +new Date(b.created_at) - +new Date(a.created_at);
            });
            return result;
        });
    }
    getBillByTableId(table_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const daoBill = yield this.billDao.getBillByTableId(table_id);
            if (util_1.isUndefined(daoBill) || !daoBill) {
                throw new routing_controllers_1.NotFoundError(`Not found bill by table id ${table_id}`);
            }
            const bill = new Bill_1.Bill().toBill(daoBill);
            return bill;
        });
    }
    getTotalBillById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const daoBill = yield this.billDao.getBillById(id);
            const bill = new Bill_1.Bill().toBill(daoBill);
            return bill;
        });
    }
    create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Authorized
            // TODO: Check validate
            const daoBill = new daos_1.DaoBill().toDaoBill(req);
            return yield this.billDao.create(daoBill);
        });
    }
    update(req) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Authorized
            const bill = yield this.getBillById(req.id);
            const daoBill = new daos_1.DaoBill().toDaoBill(bill);
            const daoBillUpdared = utils_1.ModelUtils.assign(daoBill, req);
            return yield this.billDao.update(daoBillUpdared);
        });
    }
    updateTotalById(id, total) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Authorized
            return yield this.billDao.updateTotal(id, total);
        });
    }
}
exports.BillService = BillService;
