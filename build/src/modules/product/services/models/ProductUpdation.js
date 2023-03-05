"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductUpdation = void 0;
const utils_1 = require("../../../utils");
const class_validator_1 = require("class-validator");
class ProductUpdation {
    constructor(init) {
        this.id = "";
        this.name = "";
        this.price = 0.0;
        this.disable = false;
        this.description = "";
        this.category_id = "";
        this.image = "";
        this.updated_by_id = "";
        utils_1.ModelUtils.assign(this, init);
    }
}
__decorate([
    class_validator_1.IsOptional()
], ProductUpdation.prototype, "id", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], ProductUpdation.prototype, "name", void 0);
__decorate([
    class_validator_1.IsOptional()
], ProductUpdation.prototype, "price", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean()
], ProductUpdation.prototype, "disable", void 0);
__decorate([
    class_validator_1.IsOptional()
], ProductUpdation.prototype, "description", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNotEmpty()
], ProductUpdation.prototype, "category_id", void 0);
__decorate([
    class_validator_1.IsOptional()
], ProductUpdation.prototype, "image", void 0);
__decorate([
    class_validator_1.IsOptional()
], ProductUpdation.prototype, "updated_by_id", void 0);
exports.ProductUpdation = ProductUpdation;
