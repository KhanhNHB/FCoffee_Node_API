"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
class DaoProduct {
    constructor(init) {
        this.id = "";
        this.name = "";
        this.price = 0;
        this.disable = false;
        this.description = "";
        this.category_id = "";
        this.image = "";
        this.created_at = "";
        this.created_by_id = "";
        this.updated_at = "";
        this.updated_by_id = "";
        utils_1.ModelUtils.assign(this, init);
    }
    toDaoProduct(init) {
        return utils_1.ModelUtils.assign(this, init);
    }
}
exports.DaoProduct = DaoProduct;
