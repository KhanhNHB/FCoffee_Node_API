import uuid from "uuid/v1";
import { omit, values } from "lodash";
import { Connection } from "../../../database";
import { ModelUtils } from "../../utils";
import { DateUtils } from "../../utils/date/DateUtils";
import { DaoAccount } from "./models/DaoAccount";

const DATABASE_NAME = "fcoffee";
const TABLE_NAME = "accounts";

export class AccountDao {
    pool: any

    constructor() {
        this.pool = Connection.connectDB();
    }

    generateId() {
        return `pro_${DateUtils.getDate()}_${uuid()}`;
    }

    async getAccounts(): Promise<any> {
        const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME};`;
        const result = await this.pool.query(query);
        return result[0];
    }

    async getAccountById(id: string): Promise<DaoAccount> {
        return new DaoAccount();
    }

    async getAccountByUsername(username: string): Promise<DaoAccount> {
        const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME} WHERE username = '${username}';`;
        const result = await this.pool.query(query);
        const daoAccount = new DaoAccount().toDaoAccount(result[0][0]);
        return daoAccount;
    }

    async create(req: DaoAccount): Promise<Boolean> {
        req.created_at = DateUtils.formatDate(Date.now());
        const query = `INSERT INTO ${DATABASE_NAME}.${TABLE_NAME} ${ModelUtils.getKeys(req)} VALUES ${ModelUtils.getValues(req)};`;
        await this.pool.query(query);
        return true;
    }

    async update(req: DaoAccount): Promise<Boolean> {
        req.updated_at = DateUtils.formatDate(Date.now());
        const query = `UPDATE ${DATABASE_NAME}.${TABLE_NAME} SET ${ModelUtils.getKeyUpdate(omit(req,
            "username"))} WHERE username = '${req.username}';`;
        const valuesQuery = values(omit(req, "username"));
        await this.pool.query(query, valuesQuery);
        return true;
    }

    async delete(username: string): Promise<Boolean> {
        const query = `UPDATE ${DATABASE_NAME}.${TABLE_NAME} SET disable = true WHERE username = '${username}';`;
        await this.pool.query(query);
        return true;
    }
}
