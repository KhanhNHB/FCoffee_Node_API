"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../../utils");
class BillInfoDetail {
    constructor(init) {
        this.name = "";
        this.quantity = 0;
        this.price = 0.0;
        this.total_price = 0.0;
        utils_1.ModelUtils.assign(this, init);
    }
    toBillInfoDetail(init) {
        return utils_1.ModelUtils.assign(this, init);
    }
}
exports.BillInfoDetail = BillInfoDetail;
