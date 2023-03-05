"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillInfo = void 0;
const class_validator_1 = require("class-validator");
const utils_1 = require("../../../../utils");
class BillInfo {
    constructor(init) {
        this.id = "";
        this.bill_id = "";
        this.product_id = "";
        this.quantity = 1;
        this.price = 0;
        this.disable = false;
        utils_1.ModelUtils.assign(this, init);
    }
    toBillInfo(init) {
        return utils_1.ModelUtils.assign(this, init);
    }
}
__decorate([
    class_validator_1.IsOptional()
], BillInfo.prototype, "id", void 0);
__decorate([
    class_validator_1.IsOptional()
], BillInfo.prototype, "bill_id", void 0);
__decorate([
    class_validator_1.IsOptional()
], BillInfo.prototype, "product_id", void 0);
__decorate([
    class_validator_1.IsOptional()
], BillInfo.prototype, "quantity", void 0);
__decorate([
    class_validator_1.IsOptional()
], BillInfo.prototype, "price", void 0);
__decorate([
    class_validator_1.IsOptional()
], BillInfo.prototype, "disable", void 0);
exports.BillInfo = BillInfo;
