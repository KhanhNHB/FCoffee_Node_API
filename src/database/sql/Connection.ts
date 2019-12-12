const mysql = require('mysql2/promise');
import fs from "fs";

export class Connection {

    static connectDB() {

        // const pool = mysql.createPool({
        //     host: "fcoffee.mysql.database.azure.com",
        //     user: "khanhnhb@fcoffee",
        //     password: "123ASDqwe!@#",
        //     database: "fcoffee",
        //     port: 3306,
        //     ssl: {
        //         ca: fs.readFileSync(__dirname + "/BaltimoreCyberTrustRoot.crt.pem")
        //     }
        // });

        const pool = mysql.createPool({
            host: "0.0.0.0",
            user: "root",
            password: "123456",
            database: "fcoffee",
            port: 3306
        });

        return pool;
    }
}