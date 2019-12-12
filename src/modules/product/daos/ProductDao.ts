import uuid from "uuid/v1";
import { omit, values } from "lodash";
import { DaoProduct } from ".";
import { Connection } from "../../../database";
import { ModelUtils } from "../../utils";
import { DateUtils } from "../../utils/date/DateUtils";

const DATABASE_NAME = "fcoffee";
const TABLE_NAME = "products";


export class ProductDao {

    pool: any;

    constructor() {
        this.pool = Connection.connectDB();
    }

    generateId() {
        return `pro_${DateUtils.getDate()}_${uuid()}`;
    }

    async getProducts(): Promise<any> {
        const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME};`;
        const result = await this.pool.query(query);
        return result[0];
    }

    async getProductById(id: string): Promise<DaoProduct> {
        const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME} WHERE id = '${id}';`;
        const result = await this.pool.query(query);
        const daoProduct = new DaoProduct().toDaoProduct(result[0][0]);
        return daoProduct;
    }

    async getProductByName(name: string): Promise<DaoProduct> {
        const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME} WHERE name = '${name}';`;
        const result = await this.pool.query(query);
        const daoProduct = new DaoProduct().toDaoProduct(result[0][0]);
        return daoProduct;
    }

    async create(req: DaoProduct): Promise<Boolean> {
        req.id = this.generateId();
        req.created_at = DateUtils.formatDate(Date.now());
        req.updated_at = req.created_at;
        const query = `INSERT INTO ${DATABASE_NAME}.${TABLE_NAME} ${ModelUtils.getKeys(req)} VALUES ${ModelUtils.getValues(req)};`;
        await this.pool.query(query);
        return true;
    }

    async update(req: DaoProduct): Promise<Boolean> {
        req.updated_at = DateUtils.formatDate(Date.now());
        const query = `UPDATE ${DATABASE_NAME}.${TABLE_NAME} SET ${ModelUtils.getKeyUpdate(omit(req,
            "id"))} WHERE id = '${req.id}';`;
        const valuesQuery = values(omit(req, "id"));
        await this.pool.query(query, valuesQuery);
        return true;
    }

    async delete(id: string): Promise<Boolean> {
        const query = `UPDATE ${DATABASE_NAME}.${TABLE_NAME} SET disable = true WHERE id = '${id}';`;
        await this.pool.query(query);
        return true;
    }
}