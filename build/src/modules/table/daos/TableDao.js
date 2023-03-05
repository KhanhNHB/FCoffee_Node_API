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
exports.TableDao = void 0;
const v1_1 = __importDefault(require("uuid/v1"));
const database_1 = require("../../../database");
const utils_1 = require("../../utils");
const DateUtils_1 = require("../../utils/date/DateUtils");
const DaoTable_1 = require("./models/DaoTable");
const DATABASE_NAME = "fcoffee";
const TABLE_NAME = "tables";
class TableDao {
    constructor() {
        this.pool = database_1.Connection.connectDB();
    }
    generateId() {
        return `tab_${DateUtils_1.DateUtils.getDate()}_${v1_1.default()}`;
    }
    getTables() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME};`;
            const result = yield this.pool.query(query);
            return result[0];
        });
    }
    getTableById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME} WHERE id = '${id}';`;
            const result = yield this.pool.query(query);
            const daoTable = new DaoTable_1.DaoTable().toDaoTable(result[0][0]);
            return daoTable;
        });
    }
    getTableByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME} WHERE name = '${name}';`;
            const result = yield this.pool.query(query);
            const daoTable = new DaoTable_1.DaoTable().toDaoTable(result[0][0]);
            return daoTable;
        });
    }
    getTableNames() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT name FROM ${DATABASE_NAME}.${TABLE_NAME};`;
            const result = yield this.pool.query(query);
            return result[0];
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
    updateAvailable(id, available) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `UPDATE ${DATABASE_NAME}.${TABLE_NAME} SET available = ${available} WHERE id = '${id}';`;
            yield this.pool.query(query, null);
            return true;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `UPDATE ${DATABASE_NAME}.${TABLE_NAME} SET disable = true WHERE id = '${id}';`;
            yield this.pool.query(query);
            return true;
        });
    }
}
exports.TableDao = TableDao;
