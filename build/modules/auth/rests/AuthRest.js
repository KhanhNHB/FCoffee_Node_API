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
const AuthService_1 = require("../services/AuthService");
let AuthRest = class AuthRest {
    constructor() {
        this.authService = new AuthService_1.AuthService();
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.authService.checkSignIn(req);
                return res.send(utils_1.ResponseEntity.ok(result));
            }
            catch (error) {
                return res
                    .status(404)
                    .send(utils_1.ResponseEntity.ok(null, HttpStatus_1.HttpStatus.FAIL, error));
            }
        });
    }
};
__decorate([
    routing_controllers_1.Post("/sign_in"),
    __param(0, routing_controllers_1.Body()), __param(1, routing_controllers_1.Res())
], AuthRest.prototype, "signIn", null);
AuthRest = __decorate([
    routing_controllers_1.JsonController("/auth")
], AuthRest);
exports.AuthRest = AuthRest;
