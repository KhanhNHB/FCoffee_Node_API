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
exports.AccountDao = void 0;
const v1_1 = __importDefault(require("uuid/v1"));
const lodash_1 = require("lodash");
const database_1 = require("../../../database");
const utils_1 = require("../../utils");
const DateUtils_1 = require("../../utils/date/DateUtils");
const DaoAccount_1 = require("./models/DaoAccount");
const DATABASE_NAME = "fcoffee";
const TABLE_NAME = "accounts";
class AccountDao {
    constructor() {
        this.pool = database_1.Connection.connectDB();
    }
    generateId() {
        return `pro_${DateUtils_1.DateUtils.getDate()}_${v1_1.default()}`;
    }
    getAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME};`;
            const result = yield this.pool.query(query);
            return result[0];
        });
    }
    getAccountById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new DaoAccount_1.DaoAccount();
        });
    }
    getAccountByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME} WHERE username = '${username}';`;
            const result = yield this.pool.query(query);
            const daoAccount = new DaoAccount_1.DaoAccount().toDaoAccount(result[0][0]);
            return daoAccount;
        });
    }
    create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            req.created_at = DateUtils_1.DateUtils.formatDate(Date.now());
            const query = `INSERT INTO ${DATABASE_NAME}.${TABLE_NAME} ${utils_1.ModelUtils.getKeys(req)} VALUES ${utils_1.ModelUtils.getValues(req)};`;
            yield this.pool.query(query);
            return true;
        });
    }
    update(req) {
        return __awaiter(this, void 0, void 0, function* () {
            req.updated_at = DateUtils_1.DateUtils.formatDate(Date.now());
            const query = `UPDATE ${DATABASE_NAME}.${TABLE_NAME} SET ${utils_1.ModelUtils.getKeyUpdate(lodash_1.omit(req, "username"))} WHERE username = '${req.username}';`;
            const valuesQuery = lodash_1.values(lodash_1.omit(req, "username"));
            yield this.pool.query(query, valuesQuery);
            return true;
        });
    }
    delete(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `UPDATE ${DATABASE_NAME}.${TABLE_NAME} SET disable = true WHERE username = '${username}';`;
            yield this.pool.query(query);
            return true;
        });
    }
}
exports.AccountDao = AccountDao;
