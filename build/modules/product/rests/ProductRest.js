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
const ProductService_1 = require("../services/ProductService");
let ProductRest = class ProductRest {
    constructor() {
        this.productService = new ProductService_1.ProductService();
    }
    getAll(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.productService.getProducts();
                return res.send(utils_1.ResponseEntity.ok(products));
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
                const product = yield this.productService.getProductById(id);
                if (!product)
                    res
                        .status(HttpStatus_1.HttpStatusCode.NOT_FOUND)
                        .send(utils_1.ResponseEntity.ok(null, HttpStatus_1.HttpStatus.FAIL));
                return res.send(utils_1.ResponseEntity.ok(product));
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
                const result = yield this.productService.create(req);
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
    update(req, id, res, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.id = id;
                req.updated_by_id = auth.data.username;
                const result = yield this.productService.update(req);
                return res.send(utils_1.ResponseEntity.ok(result));
            }
            catch (error) {
                return res
                    .status(HttpStatus_1.HttpStatusCode.NOT_FOUND)
                    .send(utils_1.ResponseEntity.ok(null, HttpStatus_1.HttpStatus.FAIL, error));
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.productService.delete(req.params.id);
                return res.send(utils_1.ResponseEntity.ok(result));
            }
            catch (e) {
                return res.status(404).send(utils_1.ResponseEntity.ok(null, HttpStatus_1.HttpStatus.FAIL, e));
            }
        });
    }
};
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Get(""),
    __param(0, routing_controllers_1.Res())
], ProductRest.prototype, "getAll", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Get("/:id"),
    __param(0, routing_controllers_1.Param("id")), __param(1, routing_controllers_1.Res())
], ProductRest.prototype, "getDetail", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Post(""),
    __param(0, routing_controllers_1.Body()),
    __param(1, routing_controllers_1.Res())
], ProductRest.prototype, "create", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Put("/:id"),
    __param(0, routing_controllers_1.Body()),
    __param(1, routing_controllers_1.Param("id")),
    __param(2, routing_controllers_1.Res()),
    __param(3, routing_controllers_1.CurrentUser())
], ProductRest.prototype, "update", null);
__decorate([
    routing_controllers_1.Authorized(),
    routing_controllers_1.Delete("/:id"),
    __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Res())
], ProductRest.prototype, "delete", null);
ProductRest = __decorate([
    routing_controllers_1.JsonController("/products")
], ProductRest);
exports.ProductRest = ProductRest;
