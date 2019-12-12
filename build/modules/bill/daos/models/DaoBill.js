"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
class DaoBill {
    constructor(init) {
        this.id = "";
        this.table_id = "";
        this.paid = false;
        this.discount = 0.0;
        this.total = 0.0;
        this.created_at = "";
        this.created_by_id = "";
        utils_1.ModelUtils.assign(this, init);
    }
    toDaoBill(init) {
        return utils_1.ModelUtils.assign(this, init);
    }
}
exports.DaoBill = DaoBill;
