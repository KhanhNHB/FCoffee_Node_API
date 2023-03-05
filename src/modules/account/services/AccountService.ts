import { keys, omit } from "lodash";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { isUndefined } from "util";
import { Encode } from "../../common/Encode";
import { AccountDao } from "../daos/AccountDao";
import { DaoAccount } from "../daos/models/DaoAccount";
import { Account } from "./models/Account";
import { AccountCreation } from "./models/AccountCreation";
import { AccountUpdation } from "./models/AccountUpdation";
import { ModelUtils } from "../../utils";

export class AccountSerivce {
    accountDao: AccountDao;

    constructor() {
        this.accountDao = new AccountDao();
    }

    async getAccounts(): Promise<any> {
        return await this.accountDao.getAccounts();
    }

    async getAccountById(id: string): Promise<Account> {
        // TODO: Authorized
        const daoAccount = await this.accountDao.getAccountById(id);
        if (isUndefined(daoAccount) || !daoAccount) {
            throw new NotFoundError(`Account id ${id} is not found!`);
        }
        const account = new Account().toAccount(daoAccount);
        return account;
    }

    async getAccountByUsername(username: string): Promise<Account> {
        const daoAccount = await this.accountDao.getAccountByUsername(username);
        if (daoAccount === undefined || !daoAccount) {
            throw new NotFoundError(`Not found account by ${username}`);
        }
        const account = new Account().toAccount(daoAccount);
        return account;
    }

    async create(req: AccountCreation): Promise<Boolean> {
        // TODO: Authorized
        try {
            const account = await this.getAccountByUsername(req.username);
            if (account) {
                throw new BadRequestError(`Account ${req.username} is existed!`);
            }
        } catch (err) {

        } finally {
            const daoAccount = new DaoAccount().toDaoAccount(req);
            daoAccount.password = await Encode.hash(daoAccount.password);
            await this.accountDao.create(daoAccount);
        }
        
        return true;
    }

    async update(req: AccountUpdation): Promise<Boolean> {
        // TODO: Authorized
        const account = await this.getAccountByUsername(req.username);
        const daoAccount = new DaoAccount().toDaoAccount(account);

        const daoAccountUpdated = ModelUtils.assign(daoAccount, req);
        return await this.accountDao.update(daoAccountUpdated);
    }

    async delete(username: string): Promise<Boolean> {
        // TODO: Authorized
        const account = await this.getAccountByUsername(username);
        if (account.disable) {
            return true;
        }
        return await this.accountDao.delete(username);
    }
}
