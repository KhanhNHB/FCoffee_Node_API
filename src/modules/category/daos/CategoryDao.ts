import uuid from "uuid/v1";
import { omit, values } from "lodash";
import { Connection } from "../../../database";
import { ModelUtils } from "../../utils";
import { DateUtils } from "../../utils/date/DateUtils";
import { DaoCategory } from "./models/DaoCategory";

const DATABASE_NAME = "fcoffee";
const TABLE_NAME = "categories";


export class CategoryDao {

    pool: any;

    constructor() {
        this.pool = Connection.connectDB();
    }

    generateId() {
        return `cate_${DateUtils.getDate()}_${uuid()}`;
    }

    async getCategories(): Promise<any> {
        const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME};`;
        const result = await this.pool.query(query);
        return result[0];
    }

    async getCategoryById(id: string): Promise<DaoCategory> {
        const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME} WHERE id = '${id}';`;
        const result = await this.pool.query(query);
        const daoCategory = new DaoCategory().toDaoCategory(result[0][0]);
        return daoCategory;
    }

    async getCategoryByName(name: string): Promise<DaoCategory> {
        const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME} WHERE name = '${name}';`;
        const result = await this.pool.query(query);
        const daoCategory = new DaoCategory().toDaoCategory(result[0][0]);
        return daoCategory;
    }

    async create(req: DaoCategory): Promise<Boolean> {
        req.id = this.generateId();
        req.created_at = DateUtils.formatDate(Date.now());
        req.updated_at = req.created_at;
        const query = `INSERT INTO ${DATABASE_NAME}.${TABLE_NAME} ${ModelUtils.getKeys(req)} VALUES ${ModelUtils.getValues(req)};`;
        await this.pool.query(query);
        return true;
    }

    async update(req: DaoCategory): Promise<Boolean> {
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