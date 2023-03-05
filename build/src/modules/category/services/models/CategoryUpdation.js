"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryUpdation = void 0;
const utils_1 = require("../../../utils");
const class_validator_1 = require("class-validator");
class CategoryUpdation {
    constructor(init) {
        utils_1.ModelUtils.assign(this, init);
    }
}
__decorate([
    class_validator_1.IsOptional()
], CategoryUpdation.prototype, "id", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], CategoryUpdation.prototype, "name", void 0);
__decorate([
    class_validator_1.IsOptional()
], CategoryUpdation.prototype, "updated_at", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], CategoryUpdation.prototype, "updated_by_id", void 0);
exports.CategoryUpdation = CategoryUpdation;
