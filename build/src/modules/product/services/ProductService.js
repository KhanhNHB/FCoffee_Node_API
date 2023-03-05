"use strict";
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
exports.ProductService = void 0;
const routing_controllers_1 = require("routing-controllers");
const util_1 = require("util");
const services_1 = require("../../category/services");
const daos_1 = require("../daos");
const ProductDao_1 = require("../daos/ProductDao");
const Product_1 = require("./models/Product");
const utils_1 = require("../../utils");
class ProductService {
    constructor() {
        this.productDao = new ProductDao_1.ProductDao();
    }
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productDao.getProducts();
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const daoProduct = yield this.productDao.getProductById(id);
            if (util_1.isUndefined(daoProduct) || !daoProduct) {
                throw new routing_controllers_1.NotFoundError(`Not found product by id ${id}`);
            }
            const product = new Product_1.Product().toProduct(daoProduct);
            return product;
        });
    }
    getProductByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const daoProduct = yield this.productDao.getProductByName(name);
            if (util_1.isUndefined(daoProduct) || !daoProduct) {
                return null;
            }
            const product = new Product_1.Product().toProduct(daoProduct);
            return product;
        });
    }
    create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryService = new services_1.CategoryService();
            // TODO: Authorized
            // TODO: Check validate
            try {
                yield this.getProductByName(req.name);
            }
            finally {
                yield categoryService.getCategoryById(req.category_id);
                const daoProduct = new daos_1.DaoProduct().toDaoProduct(req);
                yield this.productDao.create(daoProduct);
                return true;
            }
        });
    }
    update(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryService = new services_1.CategoryService();
            // TODO: Authorized
            // valid product
            const product = yield this.getProductById(req.id);
            // valid name
            const result = yield this.getProductByName(req.name);
            if (result) {
                throw new routing_controllers_1.BadRequestError(`Product ${req.name} is existed!`);
            }
            // valid category
            yield categoryService.getCategoryById(req.category_id);
            const daoProduct = new daos_1.DaoProduct().toDaoProduct(product);
            const daoProductUpdated = utils_1.ModelUtils.assign(daoProduct, req);
            return yield this.productDao.update(daoProductUpdated);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Authorized
            const product = yield this.getProductById(id);
            if (util_1.isUndefined(product) || !product) {
                throw new routing_controllers_1.NotFoundError(`Product id ${id} is not found!`);
            }
            if (product.disable) {
                return true;
            }
            return yield this.productDao.delete(id);
        });
    }
}
exports.ProductService = ProductService;
