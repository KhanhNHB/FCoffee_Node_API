"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
class Config {
    constructor(database, host, user, password) {
        this.database = database;
        this.host = host;
        this.user = user;
        this.password = password;
    }
}
exports.Config = Config;
