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
exports.AuthDao = void 0;
const DaoAuth_1 = require("./models/DaoAuth");
const database_1 = require("../../../database");
const DATABASE_NAME = "fcoffee";
const TABLE_NAME = "accounts";
class AuthDao {
    constructor() {
        this.pool = database_1.Connection.connectDB();
    }
    checkSignIn(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME} WHERE username = '${req.username}';`;
            const result = yield this.pool.query(query);
            const daoAuth = new DaoAuth_1.DaoAuth().toDaoAuth(result[0][0]);
            return daoAuth;
        });
    }
}
exports.AuthDao = AuthDao;
