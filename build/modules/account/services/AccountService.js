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
const Encode_1 = require("../../common/Encode");
const AccountDao_1 = require("../daos/AccountDao");
const DaoAccount_1 = require("../daos/models/DaoAccount");
const Account_1 = require("./models/Account");
const utils_1 = require("../../utils");
class AccountSerivce {
    constructor() {
        this.accountDao = new AccountDao_1.AccountDao();
    }
    getAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.accountDao.getAccounts();
        });
    }
    getAccountById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Authorized
            const daoAccount = yield this.accountDao.getAccountById(id);
            if (util_1.isUndefined(daoAccount) || !daoAccount) {
                throw new routing_controllers_1.NotFoundError(`Account id ${id} is not found!`);
            }
            const account = new Account_1.Account().toAccount(daoAccount);
            return account;
        });
    }
    getAccountByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const daoAccount = yield this.accountDao.getAccountByUsername(username);
            if (util_1.isUndefined(daoAccount) || !daoAccount) {
                throw new routing_controllers_1.NotFoundError(`Not found account by ${username}`);
            }
            const account = new Account_1.Account().toAccount(daoAccount);
            return account;
        });
    }
    create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Authorized
            try {
                const account = yield this.getAccountByUsername(req.username);
                if (account) {
                    throw new routing_controllers_1.BadRequestError(`Account ${req.username} is existed!`);
                }
            }
            catch (err) {
            }
            finally {
                const daoAccount = new DaoAccount_1.DaoAccount().toDaoAccount(req);
                daoAccount.password = yield Encode_1.Encode.hash(daoAccount.password);
                yield this.accountDao.create(daoAccount);
                return true;
            }
        });
    }
    update(req) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Authorized
            const account = yield this.getAccountByUsername(req.username);
            const daoAccount = new DaoAccount_1.DaoAccount().toDaoAccount(account);
            const daoAccountUpdated = utils_1.ModelUtils.assign(daoAccount, req);
            return yield this.accountDao.update(daoAccountUpdated);
        });
    }
    delete(username) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Authorized
            const account = yield this.getAccountByUsername(username);
            if (account.disable) {
                return true;
            }
            return yield this.accountDao.delete(username);
        });
    }
}
exports.AccountSerivce = AccountSerivce;
