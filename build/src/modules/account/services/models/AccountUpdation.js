"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountUpdation = void 0;
const class_validator_1 = require("class-validator");
const utils_1 = require("../../../utils");
class AccountUpdation {
    constructor(init) {
        this.username = "";
        this.first_name = "";
        this.last_name = "";
        this.image = "";
        utils_1.ModelUtils.assign(this, init);
    }
}
__decorate([
    class_validator_1.IsOptional()
], AccountUpdation.prototype, "username", void 0);
__decorate([
    class_validator_1.IsOptional()
], AccountUpdation.prototype, "first_name", void 0);
__decorate([
    class_validator_1.IsOptional()
], AccountUpdation.prototype, "last_name", void 0);
__decorate([
    class_validator_1.IsOptional()
], AccountUpdation.prototype, "image", void 0);
exports.AccountUpdation = AccountUpdation;
