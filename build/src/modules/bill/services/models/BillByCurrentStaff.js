"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillByCurrentStaff = void 0;
const utils_1 = require("../../../utils");
class BillByCurrentStaff {
    constructor(init) {
        this.id = "";
        this.table_name = "";
        this.total = 0.0;
        this.created_at = "";
        utils_1.ModelUtils.assign(this, init);
    }
    toBillByCurrentStaff(init) {
        return utils_1.ModelUtils.assign(this, init);
    }
}
exports.BillByCurrentStaff = BillByCurrentStaff;
