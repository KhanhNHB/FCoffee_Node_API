"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../../utils");
class DaoBillInfo {
    constructor(init) {
        this.id = "";
        this.bill_id = "";
        this.product_id = "";
        this.price = 0;
        this.disable = false;
        this.quantity = 1;
        utils_1.ModelUtils.assign(this, init);
    }
    toDaoBillInfo(init) {
        return utils_1.ModelUtils.assign(this, init);
    }
}
exports.DaoBillInfo = DaoBillInfo;
