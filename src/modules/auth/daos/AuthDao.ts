import { DaoAuth } from "./models/DaoAuth";
import { AuthSignIn } from "../services/models/AuthSignIn";
import { Connection } from "../../../database";

const DATABASE_NAME = "fcoffee";
const TABLE_NAME = "accounts";

export class AuthDao {
    pool: any;

    constructor() {
        this.pool = Connection.connectDB();
    }

    async checkSignIn(req: AuthSignIn): Promise<DaoAuth> {
        const query = `SELECT * FROM ${DATABASE_NAME}.${TABLE_NAME} WHERE username = '${req.username}';`;
        const result = await this.pool.query(query);
        const daoAuth = new DaoAuth().toDaoAuth(result[0][0]);
        return daoAuth;
    }
}