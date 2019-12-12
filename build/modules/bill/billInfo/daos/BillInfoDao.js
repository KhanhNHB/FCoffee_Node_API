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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const database_1 = require("../../../../database");
const utils_1 = require("../../../utils");
const v1_1 = __importDefault(require("uuid/v1"));
const DATABASE_NAME = "fcoffee";
const TABLE_NAME = "billinfos";
class BillInfoDao {
    constructor() {
        this.pool = database_1.Connection.connectDB();
    }
    generateId() {
        return `bill_info_${utils_1.DateUtils.getDate()}_${v1_1.default()}`;
    }
    getBillInfos() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME};`;
            const result = yield this.pool.query(query);
            return result[0];
        });
    }
    getBillInfoByBillId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME} WHERE bill_id = '${id}' AND disable = false;`;
            const result = yield this.pool.query(query);
            return result[0];
        });
    }
    getBillInfoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME} WHERE id = '${id}';`;
            const result = yield this.pool.query(query);
            return result[0][0];
        });
    }
    getBillInfoByBillIdAndProductId(bill_id, product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME} WHERE bill_id = '${bill_id}' AND product_id = '${product_id}';`;
            const result = yield this.pool.query(query);
            return result[0][0];
        });
    }
    create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            req.id = this.generateId();
            const query = `INSERT INTO ${DATABASE_NAME}.${TABLE_NAME} ${utils_1.ModelUtils.getKeys(req)} VALUES ${utils_1.ModelUtils.getValues(req)};`;
            yield this.pool.query(query);
            return true;
        });
    }
    update(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `UPDATE ${DATABASE_NAME}.${TABLE_NAME} SET ${utils_1.ModelUtils.getKeyUpdate(lodash_1.omit(req, ["id", "bill_id", "product_id"]))} WHERE product_id = '${req.product_id}' AND bill_id = '${req.bill_id}';`;
            const valuesQuery = lodash_1.values(lodash_1.omit(req, ["id", "bill_id", "product_id"]));
            yield this.pool.query(query, valuesQuery);
            return true;
        });
    }
    updateStatus(bill_id, product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `UPDATE ${DATABASE_NAME}.${TABLE_NAME} SET disable = true WHERE bill_id = '${bill_id}' AND product_id = '${product_id}';`;
            yield this.pool.query(query);
            return true;
        });
    }
}
exports.BillInfoDao = BillInfoDao;
