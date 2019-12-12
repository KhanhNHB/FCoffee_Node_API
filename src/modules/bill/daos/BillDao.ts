import uuid from "uuid/v1";
import { omit, values } from "lodash";
import { Connection } from "../../../database";
import { ModelUtils } from "../../utils";
import { DateUtils } from "../../utils/date/DateUtils";
import { DaoBill } from "./models/DaoBill";

const DATABASE_NAME = "fcoffee";
const TABLE_NAME = "bills";

export class BillDao {

    pool: any;

    constructor() {
        this.pool = Connection.connectDB();
    }

    generateId() {
        return `bill_${DateUtils.getDate()}_${uuid()}`;
    }

    async getBills(): Promise<any> {
        const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME};`;
        const result = await this.pool.query(query);
        return result[0];
    }

    async getBillById(id: string): Promise<DaoBill> {
        const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME} WHERE id = '${id}';`;
        const result = await this.pool.query(query);
        const daoBill = new DaoBill().toDaoBill(result[0][0]);
        return daoBill;
    }

    async getBillByCurrentUser(username: string): Promise<any> {
        const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME} WHERE created_by_id = '${username}' AND paid = true;`;
        const result = await this.pool.query(query);
        return result[0];
    }

    async getBillByTableId(table_id: string): Promise<DaoBill> {
        const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME} WHERE table_id = '${table_id}' AND paid = false;`;
        const result = await this.pool.query(query);
        const daoBill = new DaoBill().toDaoBill(result[0][0]);
        return daoBill;
    }

    async create(req: DaoBill): Promise<Boolean> {
        req.id = this.generateId();
        req.created_at = DateUtils.formatDate(Date.now());
        const query = `INSERT INTO ${DATABASE_NAME}.${TABLE_NAME} ${ModelUtils.getKeys(req)} VALUES ${ModelUtils.getValues(req)};`;
        await this.pool.query(query);
        return true;
    }

    async update(req: DaoBill): Promise<Boolean> {
        const query = `UPDATE ${DATABASE_NAME}.${TABLE_NAME} SET ${ModelUtils.getKeyUpdate(omit(req,
            "id"))} WHERE id = '${req.id}';`;
        const valuesQuery = values(omit(req, "id"));
        await this.pool.query(query, valuesQuery);
        return true;
    }

    async updateTotal(id: string, total: number): Promise<Boolean> {
        const query = `UPDATE ${DATABASE_NAME}.${TABLE_NAME} SET total = ${total} WHERE id = '${id}';`;
        await this.pool.query(query);
        return true;
    }
}