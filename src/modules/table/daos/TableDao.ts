import uuid from "uuid/v1";
import { Connection } from "../../../database";
import { ModelUtils } from "../../utils";
import { DateUtils } from "../../utils/date/DateUtils";
import { DaoTable } from "./models/DaoTable";

const DATABASE_NAME = "fcoffee";
const TABLE_NAME = "tables";


export class TableDao {

    pool: any;

    constructor() {
        this.pool = Connection.connectDB();
    }

    generateId() {
        return `tab_${DateUtils.getDate()}_${uuid()}`;
    }

    async getTables(): Promise<any> {
        const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME};`;
        const result = await this.pool.query(query);
        return result[0];
    }

    async getTableById(id: string): Promise<DaoTable> {
        const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME} WHERE id = '${id}';`;
        const result = await this.pool.query(query);
        const daoTable = new DaoTable().toDaoTable(result[0][0]);
        return daoTable;
    }

    async getTableByName(name: string): Promise<DaoTable> {
        const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME} WHERE name = '${name}';`;
        const result = await this.pool.query(query);
        const daoTable = new DaoTable().toDaoTable(result[0][0]);
        return daoTable;
    }

    async getTableNames(): Promise<any> {
        const query = `SELECT name FROM ${DATABASE_NAME}.${TABLE_NAME};`;
        const result = await this.pool.query(query);
        return result[0];
    }

    async create(req: DaoTable): Promise<Boolean> {
        req.id = this.generateId();
        const query = `INSERT INTO ${DATABASE_NAME}.${TABLE_NAME} ${ModelUtils.getKeys(req)} VALUES ${ModelUtils.getValues(req)};`;
        await this.pool.query(query);
        return true;
    }

    async updateAvailable(id: string, available: boolean): Promise<Boolean> {
        const query = `UPDATE ${DATABASE_NAME}.${TABLE_NAME} SET available = ${available} WHERE id = '${id}';`;
        await this.pool.query(query, null);
        return true;
    }

    async delete(id: string): Promise<Boolean> {
        const query = `UPDATE ${DATABASE_NAME}.${TABLE_NAME} SET disable = true WHERE id = '${id}';`;
        await this.pool.query(query);

        return true;
    }
}