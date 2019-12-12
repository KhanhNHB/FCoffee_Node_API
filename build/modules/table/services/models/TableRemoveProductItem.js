"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
class TableRemoveProductItem {
    constructor(init) {
        this.table_id = "";
        this.bill_id = "";
        this.product_id = "";
        this.product_quantity = 0;
        this.product_price = 0.0;
        utils_1.ModelUtils.assign(this, init);
    }
}
exports.TableRemoveProductItem = TableRemoveProductItem;
