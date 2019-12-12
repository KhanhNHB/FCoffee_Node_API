import { keys, omit } from "lodash";
import { NotFoundError, BadRequestError } from "routing-controllers";
import { isUndefined } from "util";
import { CategoryService } from "../../category/services";
import { DaoProduct } from "../daos";
import { ProductDao } from "../daos/ProductDao";
import { Product } from "./models/Product";
import { ProductCreation } from "./models/ProductCreation";
import { ProductUpdation } from "./models/ProductUpdation";
import { ModelUtils } from "../../utils";

export class ProductService {
    productDao: ProductDao;

    constructor() {
        this.productDao = new ProductDao();
    }

    async getProducts(): Promise<any> {
        return await this.productDao.getProducts();
    }

    async getProductById(id: string): Promise<Product> {
        const daoProduct = await this.productDao.getProductById(id);

        if (isUndefined(daoProduct) || !daoProduct) {
            throw new NotFoundError(`Not found product by id ${id}`);
        }
        const product = new Product().toProduct(daoProduct);

        return product;
    }

    async getProductByName(name: string): Promise<any> {
        const daoProduct = await this.productDao.getProductByName(name);

        if (isUndefined(daoProduct) || !daoProduct) {
            return null;
        }
        const product = new Product().toProduct(daoProduct);

        return product;
    }

    async create(req: ProductCreation): Promise<Boolean> {
        const categoryService = new CategoryService();
        // TODO: Authorized
        // TODO: Check validate
        try {
            await this.getProductByName(req.name);
        } finally {
            await categoryService.getCategoryById(req.category_id);

            const daoProduct = new DaoProduct().toDaoProduct(req);
            await this.productDao.create(daoProduct);

            return true;
        }
    }

    async update(req: ProductUpdation): Promise<Boolean> {
        const categoryService = new CategoryService();
        // TODO: Authorized
        // valid product
        const product = await this.getProductById(req.id);

        // valid name
        const result = await this.getProductByName(req.name);
        if (result) {
            throw new BadRequestError(`Product ${req.name} is existed!`);
        }

        // valid category
        await categoryService.getCategoryById(req.category_id);

        const daoProduct = new DaoProduct().toDaoProduct(product);
        const daoProductUpdated = ModelUtils.assign(daoProduct, req);

        return await this.productDao.update(daoProductUpdated);
    }

    async delete(id: string): Promise<Boolean> {
        // TODO: Authorized
        const product = await this.getProductById(id);
        if (isUndefined(product) || !product) {
            throw new NotFoundError(
                `Product id ${id} is not found!`
            );
        }

        if (product.disable) {
            return true;
        }

        return await this.productDao.delete(id);
    }
}