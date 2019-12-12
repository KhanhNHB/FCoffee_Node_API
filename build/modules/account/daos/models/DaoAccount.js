"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
class DaoAccount {
    constructor(init) {
        this.username = "";
        this.password = "";
        this.fullname = "";
        this.role = 0;
        this.image = "";
        this.created_at = "";
        this.updated_at = "";
        utils_1.ModelUtils.assign(this, init);
    }
    toDaoAccount(init) {
        return utils_1.ModelUtils.assign(this, init);
    }
}
exports.DaoAccount = DaoAccount;
