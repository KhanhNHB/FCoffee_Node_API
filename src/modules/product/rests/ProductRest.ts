import { Request, Response } from "express";
import { Authorized, Body, Delete, Get, JsonController, Param, Post, Put, Req, Res, CurrentUser } from "routing-controllers";
import { HttpStatus, HttpStatusCode } from "../../common/HttpStatus";
import { ResponseEntity } from "../../utils";
import { ProductCreation } from "../services/models/ProductCreation";
import { ProductUpdation } from "../services/models/ProductUpdation";
import { ProductService } from "../services/ProductService";

@JsonController("/products")
export class ProductRest {
    productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    @Authorized()
    @Get("")
    async getAll(@Res() res: Response): Promise<any> {
        try {
            const products = await this.productService.getProducts();
            return res.send(ResponseEntity.ok(products));
        } catch (err) {
            console.log(`Error get all product ${err}`);
            return res
                .status(HttpStatusCode.NOT_FOUND)
                .send(ResponseEntity.error(null, HttpStatus.FAIL, err));
        }
    }

    @Authorized()
    @Get("/:id")
    async getDetail(@Param("id") id: string, @Res() res: Response): Promise<any> {
        try {
            const product = await this.productService.getProductById(id);
            if (!product) res
                .status(HttpStatusCode.NOT_FOUND)
                .send(ResponseEntity.ok(null, HttpStatus.FAIL));

            return res.send(ResponseEntity.ok(product));
        } catch (err) {
            console.log(`Error get detail product by id ${id}, ${err}`);
            return res
                .status(HttpStatusCode.NOT_FOUND)
                .send(ResponseEntity.error(null, HttpStatus.FAIL, err));
        }
    }

    @Authorized()
    @Post("")
    async create(
        @Body() req: ProductCreation,
        @Res() res: Response
    ): Promise<any> {
        try {
            const result = await this.productService.create(req);
            return res
                .status(HttpStatusCode.CREATED)
                .send(ResponseEntity.ok(result));
        } catch (err) {
            console.log(`Error create product ${err}`);
            return res
                .status(HttpStatusCode.NOT_FOUND)
                .send(ResponseEntity.error(null, HttpStatus.FAIL, err));
        }
    }

    @Authorized()
    @Put("/:id")
    async update(
        @Body() req: ProductUpdation,
        @Param("id") id: string,
        @Res() res: Response,
        @CurrentUser() auth: any
    ): Promise<any> {
        try {
            req.id = id;
            req.updated_by_id = auth.data.username;
            const result = await this.productService.update(req);
            return res.send(ResponseEntity.ok(result));
        } catch (err) {
            console.log(`Error update product by id ${id}, ${err}`);
            return res
                .status(HttpStatusCode.NOT_FOUND)
                .send(ResponseEntity.ok(null, HttpStatus.FAIL, err));
        }
    }

    @Authorized()
    @Delete("/:id")
    async delete(@Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            const result = await this.productService.delete(req.params.id);
            return res.send(ResponseEntity.ok(result));
        } catch (e) {
            return res.status(404).send(ResponseEntity.ok(null, HttpStatus.FAIL, e));
        }
    }
}
