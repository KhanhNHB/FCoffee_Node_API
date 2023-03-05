"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
const mysql = require('mysql2/promise');
class Connection {
    static connectDB() {
        const pool = mysql.createPool({
            host: "0.0.0.0",
            user: "root",
            password: "123456",
            database: "fcoffee",
            port: 3306
            //     ssl: {
            //         ca: fs.readFileSync(__dirname + "/BaltimoreCyberTrustRoot.crt.pem")
            //     }
        });
        return pool;
    }
}
exports.Connection = Connection;
