"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableDetail = void 0;
const utils_1 = require("../../../utils");
class TableDetail {
    constructor(init) {
        this.id = "";
        this.available = false;
        this.products = [];
        utils_1.ModelUtils.assign(this, init);
    }
    toTableDetail(init) {
        return utils_1.ModelUtils.assign(this, init);
    }
}
exports.TableDetail = TableDetail;
