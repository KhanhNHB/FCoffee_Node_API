const mysql = require('mysql2/promise');
import fs from "fs";
import { Config } from "../config/Config";

export class Connection {
    private static HOST_NAME: any = process.env.DATABASE_HOST_NAME || "localhost";
    private static USER_NAME: any = process.env.DATABASE_USER_NAME || "root";
    private static DATABASE_PASSWORD: any = process.env.DATABASE_PASSWORD || "password";
    private static DATABASE_NAME: any = process.env.DATABASE_NAME || "fcoffee";
    private static DATABASE_PORT: any = process.env.DATABASE_PORT || 3306;
    private static DATABASE_SSL: any = process.env.DATABASE_SSL || true;

    static pool: any;
    private config: Config;

    constructor() {
        console.log(`DB_HOST=${Connection.HOST_NAME}, DB_PORT=${Connection.DATABASE_PORT}`);
        this.config = new Config(
            Connection.DATABASE_NAME,
            Connection.HOST_NAME,
            Connection.DATABASE_PORT,
            Connection.USER_NAME,
            Connection.DATABASE_PASSWORD);
    }

    static checkConnect() {
        try {
            if (Connection.pool) {
                console.log(`Application connect MySQL success`);
                return Connection.pool;
            }

            Connection.pool = mysql.createPool({
                host: this.HOST_NAME,
                user: this.USER_NAME,
                password: this.DATABASE_PASSWORD,
                database: this.DATABASE_NAME,
                port: this.DATABASE_PORT
                //     ssl: {
                //         ca: fs.readFileSync(__dirname + "/BaltimoreCyberTrustRoot.crt.pem")
                //     }
            });

            console.log(`Application connect MySQL success`);
            return Connection.pool;
        } catch (error) {
            console.log(`Application connect MySQL fail ${error}`);
        }
    }

    static connectDB() {
        return this.checkConnect();
    }
}