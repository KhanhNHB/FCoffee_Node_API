"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const HttpStatus_1 = require("../../common/HttpStatus");
const utils_1 = require("../../utils");
const AccountService_1 = require("../services/AccountService");
let AccountRest = class AccountRest {
    constructor() {
        this.accountService = new AccountService_1.AccountSerivce();
    }
    getAll(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accounts = yield this.accountService.getAccounts();
                return res.send(utils_1.ResponseEntity.ok(accounts));
            }
            catch (err) {
                return res.send(utils_1.ResponseEntity.ok([], HttpStatus_1.HttpStatus.FAIL, err));
            }
        });
    }
    getDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield this.accountService.getAccountByUsername(req.params.username);
                return res.send(utils_1.ResponseEntity.ok(account));
            }
            catch (err) {
                return res.status(404).send(utils_1.ResponseEntity.ok(null, HttpStatus_1.HttpStatus.FAIL, err));
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.accountService.create(req);
                return res.send(utils_1.ResponseEntity.ok(result));
            }
            catch (err) {
                return res.status(400)
                    .send(utils_1.ResponseEntity.ok(false, HttpStatus_1.HttpStatus.FAIL, err));
            }
        });
    }
    update(username, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.username = username;
                const result = yield this.accountService.update(req);
                return res.send(utils_1.ResponseEntity.ok(result));
            }
            catch (error) {
                return res
                    .send(utils_1.ResponseEntity.ok(null, HttpStatus_1.HttpStatus.FAIL, error));
            }
        });
    }
    delete(username, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield this.accountService.delete(username);
                return res.send(utils_1.ResponseEntity.ok(result));
            }
            catch (error) {
                return res
                    .send(utils_1.ResponseEntity.ok(null, HttpStatus_1.HttpStatus.FAIL, error));
            }
        });
    }
};
__decorate([
    routing_controllers_1.Authorized("Admin"),
    routing_controllers_1.Get("/"),
    __param(0, routing_controllers_1.Res())
], AccountRest.prototype, "getAll", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Get("/:username"),
    __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Res())
], AccountRest.prototype, "getDetail", null);
__decorate([
    routing_controllers_1.Post(""),
    __param(0, routing_controllers_1.Body()),
    __param(1, routing_controllers_1.Res())
], AccountRest.prototype, "create", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Put("/:username"),
    __param(0, routing_controllers_1.Param("username")),
    __param(1, routing_controllers_1.Body()),
    __param(2, routing_controllers_1.Res())
], AccountRest.prototype, "update", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Delete("/:username"),
    __param(0, routing_controllers_1.Param("username")),
    __param(1, routing_controllers_1.Res())
], AccountRest.prototype, "delete", null);
AccountRest = __decorate([
    routing_controllers_1.JsonController("/accounts")
], AccountRest);
exports.AccountRest = AccountRest;
