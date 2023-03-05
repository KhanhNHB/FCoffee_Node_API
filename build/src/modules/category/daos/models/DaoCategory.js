"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaoCategory = void 0;
const utils_1 = require("../../../utils");
class DaoCategory {
    constructor(init) {
        this.disable = false;
        utils_1.ModelUtils.assign(this, init);
    }
    toDaoCategory(init) {
        return utils_1.ModelUtils.assign(this, init);
    }
}
exports.DaoCategory = DaoCategory;
