import { omit, values } from "lodash";
import { Connection } from "../../../../database";
import { DateUtils, ModelUtils } from "../../../utils";
import { DaoBillInfo } from "./models/DaoBillInfo";
import uuid from "uuid/v1";

const DATABASE_NAME = "fcoffee";
const TABLE_NAME = "billinfos";

export class BillInfoDao {

    pool: any;

    constructor() {
        this.pool = Connection.connectDB();
    }

    generateId() {
        return `bill_info_${DateUtils.getDate()}_${uuid()}`;
    }

    async getBillInfos(): Promise<any> {
        const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME};`;
        const result = await this.pool.query(query);
        return result[0];
    }

    async getBillInfoByBillId(id: string): Promise<any> {
        const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME} WHERE bill_id = '${id}' AND disable = false;`;
        const result = await this.pool.query(query);
        return result[0];
    }

    async getBillInfoById(id: string): Promise<DaoBillInfo> {
        const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME} WHERE id = '${id}';`;
        const result = await this.pool.query(query);
        return result[0][0];
    }

    async getBillInfoByBillIdAndProductId(bill_id: string, product_id: string): Promise<DaoBillInfo> {
        const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME} WHERE bill_id = '${bill_id}' AND product_id = '${product_id}';`;
        const result = await this.pool.query(query);
        return result[0][0];
    }

    async create(req: DaoBillInfo): Promise<Boolean> {
        req.id = this.generateId();
        const query = `INSERT INTO ${DATABASE_NAME}.${TABLE_NAME} ${ModelUtils.getKeys(req)} VALUES ${ModelUtils.getValues(req)};`;
        await this.pool.query(query);
        return true;
    }

    async update(req: DaoBillInfo): Promise<Boolean> {
        const query = `UPDATE ${DATABASE_NAME}.${TABLE_NAME} SET ${ModelUtils.getKeyUpdate(omit(req,
            ["id", "bill_id", "product_id"]))} WHERE product_id = '${req.product_id}' AND bill_id = '${req.bill_id}';`;
        const valuesQuery = values(omit(req, ["id", "bill_id", "product_id"]));
        await this.pool.query(query, valuesQuery);
        return true;
    }

    async updateStatus(bill_id: string, product_id: string): Promise<Boolean> {
        const query = `UPDATE ${DATABASE_NAME}.${TABLE_NAME} SET disable = true WHERE bill_id = '${bill_id}' AND product_id = '${product_id}';`;
        await this.pool.query(query);
        return true;
    }
}