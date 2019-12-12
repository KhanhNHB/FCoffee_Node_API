"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
const class_validator_1 = require("class-validator");
class Account {
    constructor(init) {
        this.username = "";
        this.password = "";
        this.disable = false;
        this.fullname = "";
        this.role = 0;
        this.image = "";
        this.created_at = "";
        this.updated_at = "";
        utils_1.ModelUtils.assign(this, init);
    }
    toAccount(init) {
        return utils_1.ModelUtils.assign(this, init);
    }
}
__decorate([
    class_validator_1.IsNotEmpty()
], Account.prototype, "username", void 0);
__decorate([
    class_validator_1.IsNotEmpty()
], Account.prototype, "password", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean()
], Account.prototype, "disable", void 0);
__decorate([
    class_validator_1.IsOptional()
], Account.prototype, "fullname", void 0);
__decorate([
    class_validator_1.IsOptional()
], Account.prototype, "role", void 0);
__decorate([
    class_validator_1.IsOptional()
], Account.prototype, "image", void 0);
__decorate([
    class_validator_1.IsOptional()
], Account.prototype, "created_at", void 0);
__decorate([
    class_validator_1.IsOptional()
], Account.prototype, "updated_at", void 0);
exports.Account = Account;
