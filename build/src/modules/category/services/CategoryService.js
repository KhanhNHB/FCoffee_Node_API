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
exports.CategoryService = void 0;
const routing_controllers_1 = require("routing-controllers");
const util_1 = require("util");
const daos_1 = require("../daos");
const CategoryDao_1 = require("../daos/CategoryDao");
const Category_1 = require("./models/Category");
class CategoryService {
    constructor() {
        this.cateogoryDao = new CategoryDao_1.CategoryDao();
    }
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.cateogoryDao.getCategories();
        });
    }
    getCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const daoCategory = yield this.cateogoryDao.getCategoryById(id);
            if (util_1.isUndefined(daoCategory) || !daoCategory) {
                throw new routing_controllers_1.NotFoundError(`Not found category by id ${id}`);
            }
            const category = new Category_1.Category().toCategory(daoCategory);
            return category;
        });
    }
    getCategoryByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const daoCategory = yield this.cateogoryDao.getCategoryByName(name);
            if (util_1.isUndefined(daoCategory) || !daoCategory) {
                throw new routing_controllers_1.NotFoundError(`Not found category by name ${name}`);
            }
            const category = new Category_1.Category().toCategory(daoCategory);
            return category;
        });
    }
    create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Authorized
            // TODO: Check validate
            const category = yield this.getCategoryByName(req.name);
            if (category) {
                throw new routing_controllers_1.BadRequestError(`Category name ${req.name} is existed!`);
            }
            const daoCategory = new daos_1.DaoCategory().toDaoCategory(req);
            yield this.cateogoryDao.create(daoCategory);
            return true;
        });
    }
    // async update(req: CategoryUpdation): Promise<Boolean> {
    //     // TODO: Authorized
    //     const category = await this.getCategoryById(req.id);
    //     if (isUndefined(category) || !category) {
    //         throw new NotFoundError(
    //             `Category id ${req.id} is not found!`
    //         );
    //     }
    //     const isExisted = await this.getCategoryByName(req.name);
    //     if (isExisted) {
    //         throw new BadRequestError(`Category name ${req.name} is existed!`);
    //     }
    //     const daoCategory = new DaoCategory().toDaoCategory(category);
    //     keys(omit(req, "id")).forEach(key => {
    //         daoCategory[key] = req[key];
    //     });
    //     return await this.cateogoryDao.update(daoCategory);
    // }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Authorized
            const category = yield this.getCategoryById(id);
            if (util_1.isUndefined(category) || !category) {
                throw new routing_controllers_1.NotFoundError(`Category id ${id} is not found!`);
            }
            if (category.disable) {
                return true;
            }
            return yield this.cateogoryDao.delete(id);
        });
    }
}
exports.CategoryService = CategoryService;
