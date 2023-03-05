"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCreation = void 0;
const class_validator_1 = require("class-validator");
const utils_1 = require("../../../utils");
class ProductCreation {
    constructor(init) {
        this.id = "";
        this.name = "";
        this.description = "";
        this.category_id = "";
        this.image = "";
        this.created_by_id = "";
        utils_1.ModelUtils.assign(this, init);
    }
}
__decorate([
    class_validator_1.IsOptional()
], ProductCreation.prototype, "id", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], ProductCreation.prototype, "name", void 0);
__decorate([
    class_validator_1.IsOptional()
], ProductCreation.prototype, "price", void 0);
__decorate([
    class_validator_1.IsOptional()
], ProductCreation.prototype, "description", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], ProductCreation.prototype, "category_id", void 0);
__decorate([
    class_validator_1.IsOptional()
], ProductCreation.prototype, "image", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], ProductCreation.prototype, "created_by_id", void 0);
exports.ProductCreation = ProductCreation;
