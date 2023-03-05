"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDetail = void 0;
const utils_1 = require("../../../utils");
class ProductDetail {
    constructor(init) {
        this.id = "";
        this.name = "";
        this.image = "";
        this.quantity = 1;
        this.price = 0.0;
        utils_1.ModelUtils.assign(this, init);
    }
    toProductDetail(init) {
        return utils_1.ModelUtils.assign(this, init);
    }
}
exports.ProductDetail = ProductDetail;
