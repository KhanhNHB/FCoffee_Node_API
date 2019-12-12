import { BadRequestError, NotFoundError } from "routing-controllers";
import { isUndefined } from "util";
import { DaoCategory } from "../daos";
import { CategoryDao } from "../daos/CategoryDao";
import { Category } from "./models/Category";
import { CategoryCreation } from "./models/CategoryCreation";

export class CategoryService {
    cateogoryDao: CategoryDao;

    constructor() {
        this.cateogoryDao = new CategoryDao();
    }

    async getCategories(): Promise<any> {
        return await this.cateogoryDao.getCategories();
    }

    async getCategoryById(id: string): Promise<Category> {
        const daoCategory = await this.cateogoryDao.getCategoryById(id);
        if (isUndefined(daoCategory) || !daoCategory) {
            throw new NotFoundError(`Not found category by id ${id}`);
        }
        const category = new Category().toCategory(daoCategory);
        return category;
    }

    async getCategoryByName(name: string): Promise<Category> {
        const daoCategory = await this.cateogoryDao.getCategoryByName(name);
        if (isUndefined(daoCategory) || !daoCategory) {
            throw new NotFoundError(`Not found category by name ${name}`);
        }
        const category = new Category().toCategory(daoCategory);
        return category;
    }

    async create(req: CategoryCreation): Promise<Boolean> {
        // TODO: Authorized

        // TODO: Check validate
        const category = await this.getCategoryByName(req.name);
        if (category) {
            throw new BadRequestError(
                `Category name ${req.name} is existed!`
            );
        }
        const daoCategory = new DaoCategory().toDaoCategory(req);
        await this.cateogoryDao.create(daoCategory);
        return true;
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

    async delete(id: string): Promise<Boolean> {
        // TODO: Authorized
        const category = await this.getCategoryById(id);
        if (isUndefined(category) || !category) {
            throw new NotFoundError(
                `Category id ${id} is not found!`
            );
        }

        if (category.disable) {
            return true;
        }
        return await this.cateogoryDao.delete(id);
    }
}