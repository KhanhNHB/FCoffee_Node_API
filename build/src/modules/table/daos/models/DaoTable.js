"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaoTable = void 0;
const utils_1 = require("../../../utils");
class DaoTable {
    constructor(init) {
        this.id = "";
        this.name = "";
        this.available = true;
        utils_1.ModelUtils.assign(this, init);
    }
    toDaoTable(init) {
        return utils_1.ModelUtils.assign(this, init);
    }
}
exports.DaoTable = DaoTable;
