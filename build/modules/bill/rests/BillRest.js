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
const services_1 = require("../services");
let BillRest = class BillRest {
    constructor() {
        this.billService = new services_1.BillService();
    }
    getAll(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bills = yield this.billService.getBills();
                return res.send(utils_1.ResponseEntity.ok(bills));
            }
            catch (err) {
                return res
                    .status(HttpStatus_1.HttpStatusCode.NOT_FOUND)
                    .send(utils_1.ResponseEntity.ok(null, HttpStatus_1.HttpStatus.FAIL, err));
            }
        });
    }
    getDetail(id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bill = yield this.billService.getBillById(id);
                if (!bill)
                    res
                        .status(HttpStatus_1.HttpStatusCode.NOT_FOUND)
                        .send(utils_1.ResponseEntity.ok(null, HttpStatus_1.HttpStatus.FAIL));
                return res.send(utils_1.ResponseEntity.ok(bill));
            }
            catch (err) {
                return res
                    .status(HttpStatus_1.HttpStatusCode.NOT_FOUND)
                    .send(utils_1.ResponseEntity.ok(null, HttpStatus_1.HttpStatus.FAIL, err));
            }
        });
    }
    getByCurrentUser(res, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bill = yield this.billService.getBillByCurrentUser(auth);
                if (!bill)
                    res
                        .status(HttpStatus_1.HttpStatusCode.NOT_FOUND)
                        .send(utils_1.ResponseEntity.ok(null, HttpStatus_1.HttpStatus.FAIL));
                return res.send(utils_1.ResponseEntity.ok(bill));
            }
            catch (err) {
                return res
                    .status(HttpStatus_1.HttpStatusCode.NOT_FOUND)
                    .send(utils_1.ResponseEntity.ok(null, HttpStatus_1.HttpStatus.FAIL, err));
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.billService.create(req);
                return res
                    .status(HttpStatus_1.HttpStatusCode.CREATED)
                    .send(utils_1.ResponseEntity.ok(result));
            }
            catch (err) {
                return res
                    .status(HttpStatus_1.HttpStatusCode.NOT_FOUND)
                    .send(utils_1.ResponseEntity.ok(null, HttpStatus_1.HttpStatus.FAIL, err));
            }
        });
    }
    update(req, id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.id = id;
                const result = yield this.billService.update(req);
                return res.send(utils_1.ResponseEntity.ok(result));
            }
            catch (error) {
                return res
                    .status(HttpStatus_1.HttpStatusCode.NOT_FOUND)
                    .send(utils_1.ResponseEntity.ok(null, HttpStatus_1.HttpStatus.FAIL, error));
            }
        });
    }
};
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Get(""),
    __param(0, routing_controllers_1.Res())
], BillRest.prototype, "getAll", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Get("/:id"),
    __param(0, routing_controllers_1.Param("id")), __param(1, routing_controllers_1.Res())
], BillRest.prototype, "getDetail", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Get("/staffs/current-staff"),
    __param(0, routing_controllers_1.Res()), __param(1, routing_controllers_1.CurrentUser())
], BillRest.prototype, "getByCurrentUser", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Post(""),
    __param(0, routing_controllers_1.Body()),
    __param(1, routing_controllers_1.Res())
], BillRest.prototype, "create", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Put("/:id"),
    __param(0, routing_controllers_1.Body()),
    __param(1, routing_controllers_1.Param("id")),
    __param(2, routing_controllers_1.Res())
], BillRest.prototype, "update", null);
BillRest = __decorate([
    routing_controllers_1.JsonController("/bills")
], BillRest);
exports.BillRest = BillRest;
