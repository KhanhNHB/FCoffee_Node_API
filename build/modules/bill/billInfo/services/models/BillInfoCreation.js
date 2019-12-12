"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const utils_1 = require("../../../../utils");
class BillInfoCreation {
    constructor(init) {
        this.id = "";
        this.bill_id = "";
        this.product_id = "";
        this.quantity = 1;
        this.price = 0.0;
        this.disable = false;
        this.is_plus = true;
        this.is_sub = true;
        utils_1.ModelUtils.assign(this, init);
    }
    toBillInfoCreation(init) {
        return utils_1.ModelUtils.assign(this, init);
    }
}
__decorate([
    class_validator_1.IsOptional()
], BillInfoCreation.prototype, "id", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], BillInfoCreation.prototype, "bill_id", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], BillInfoCreation.prototype, "product_id", void 0);
__decorate([
    class_validator_1.IsOptional()
], BillInfoCreation.prototype, "quantity", void 0);
__decorate([
    class_validator_1.IsOptional()
], BillInfoCreation.prototype, "price", void 0);
__decorate([
    class_validator_1.IsOptional()
], BillInfoCreation.prototype, "disable", void 0);
__decorate([
    class_validator_1.IsOptional()
], BillInfoCreation.prototype, "is_plus", void 0);
__decorate([
    class_validator_1.IsOptional()
], BillInfoCreation.prototype, "is_sub", void 0);
exports.BillInfoCreation = BillInfoCreation;
