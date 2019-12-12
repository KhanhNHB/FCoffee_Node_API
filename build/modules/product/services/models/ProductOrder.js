"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const utils_1 = require("../../../utils");
class ProductOrder {
    constructor(init) {
        this.id = "";
        this.price = 0.0;
        this.image = "";
        this.quantity = 1;
        this.is_plus = false;
        this.is_sub = false;
        utils_1.ModelUtils.assign(this, init);
    }
    toProductOrder(init) {
        return utils_1.ModelUtils.assign(this, init);
    }
}
__decorate([
    class_validator_1.IsOptional()
], ProductOrder.prototype, "id", void 0);
__decorate([
    class_validator_1.IsOptional()
], ProductOrder.prototype, "price", void 0);
__decorate([
    class_validator_1.IsOptional()
], ProductOrder.prototype, "image", void 0);
__decorate([
    class_validator_1.IsOptional()
], ProductOrder.prototype, "quantity", void 0);
__decorate([
    class_validator_1.IsOptional()
], ProductOrder.prototype, "is_plus", void 0);
__decorate([
    class_validator_1.IsOptional()
], ProductOrder.prototype, "is_sub", void 0);
exports.ProductOrder = ProductOrder;
