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
exports.CategoryDao = void 0;
const v1_1 = __importDefault(require("uuid/v1"));
const lodash_1 = require("lodash");
const database_1 = require("../../../database");
const utils_1 = require("../../utils");
const DateUtils_1 = require("../../utils/date/DateUtils");
const DaoCategory_1 = require("./models/DaoCategory");
const DATABASE_NAME = "fcoffee";
const TABLE_NAME = "categories";
class CategoryDao {
    constructor() {
        this.pool = database_1.Connection.connectDB();
    }
    generateId() {
        return `cate_${DateUtils_1.DateUtils.getDate()}_${v1_1.default()}`;
    }
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME};`;
            const result = yield this.pool.query(query);
            return result[0];
        });
    }
    getCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME} WHERE id = '${id}';`;
            const result = yield this.pool.query(query);
            const daoCategory = new DaoCategory_1.DaoCategory().toDaoCategory(result[0][0]);
            return daoCategory;
        });
    }
    getCategoryByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME} WHERE name = '${name}';`;
            const result = yield this.pool.query(query);
            const daoCategory = new DaoCategory_1.DaoCategory().toDaoCategory(result[0][0]);
            return daoCategory;
        });
    }
    create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            req.id = this.generateId();
            req.created_at = DateUtils_1.DateUtils.formatDate(Date.now());
            req.updated_at = req.created_at;
            const query = `INSERT INTO ${DATABASE_NAME}.${TABLE_NAME} ${utils_1.ModelUtils.getKeys(req)} VALUES ${utils_1.ModelUtils.getValues(req)};`;
            yield this.pool.query(query);
            return true;
        });
    }
    update(req) {
        return __awaiter(this, void 0, void 0, function* () {
            req.updated_at = DateUtils_1.DateUtils.formatDate(Date.now());
            const query = `UPDATE ${DATABASE_NAME}.${TABLE_NAME} SET ${utils_1.ModelUtils.getKeyUpdate(lodash_1.omit(req, "id"))} WHERE id = '${req.id}';`;
            const valuesQuery = lodash_1.values(lodash_1.omit(req, "id"));
            yield this.pool.query(query, valuesQuery);
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
exports.CategoryDao = CategoryDao;
