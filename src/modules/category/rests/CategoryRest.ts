import { Request, Response } from "express";
import { Authorized, Body, Delete, Get, JsonController, Param, Post, Put, Req, Res } from "routing-controllers";
import { HttpStatus, HttpStatusCode } from "../../common/HttpStatus";
import { ResponseEntity } from "../../utils";
import { CategoryService } from "../services";
import { CategoryCreation } from "../services/models/CategoryCreation";
import { CategoryUpdation } from "../services/models/CategoryUpdation";

@JsonController("/categories")
export class CategoryRest {
    categoryService: CategoryService;

    constructor(categoryService: CategoryService) {
        this.categoryService = new CategoryService();
    }

    @Authorized()
    @Get("")
    async getAll(@Res() res: Response): Promise<any> {
        try {
            const category = await this.categoryService.getCategories();
            return res.send(ResponseEntity.ok(category));
        } catch (err) {
            return res
                .status(HttpStatusCode.NOT_FOUND)
                .send(ResponseEntity.ok(null, HttpStatus.FAIL, err));
        }

    }

    @Authorized()
    @Get("/:id")
    async getDetail(@Param("id") id: string, @Res() res: Response): Promise<any> {
        try {
            let category = await this.categoryService.getCategoryById(id);

            if (!category) return res
                .status(HttpStatusCode.NOT_FOUND)
                .send(ResponseEntity.ok(null, HttpStatus.FAIL));

            return res.send(ResponseEntity.ok(category));
        } catch (err) {
            return res
                .status(HttpStatusCode.NOT_FOUND)
                .send(ResponseEntity.ok(null, HttpStatus.FAIL, err));
        }
    }

    @Authorized()
    @Post("")
    async create(
        @Body() req: CategoryCreation,
        @Res() res: Response
    ): Promise<any> {
        try {
            let result = await this.categoryService.create(req);
            return res
                .status(HttpStatusCode.CREATED)
                .send(ResponseEntity.ok(result));
        } catch (err) {
            return res
                .send(ResponseEntity.ok(false, HttpStatus.FAIL, err));
        }

    }

    // @Authorized()
    // @Put("/:id")
    // async update(
    //     @Body() req: CategoryUpdation,
    //     @Param("id") id: string,
    //     @Res() res: Response
    // ): Promise<any> {
    //     try {
    //         req.id = id;
    //         let result = await this.categoryService.update(req);
    //         return res.send(ResponseEntity.ok(result));
    //     } catch (error) {
    //         return res
    //             .status(HttpStatusCode.NOT_FOUND)
    //             .send(ResponseEntity.ok(null, HttpStatus.FAIL, error));
    //     }
    // }

    @Authorized()
    @Delete("/:id")
    async delete(@Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            let result = await this.categoryService.delete(req.params.id);
            return res.send(ResponseEntity.ok(result));
        } catch (e) {
            return res.status(404).send(ResponseEntity.ok(null, HttpStatus.FAIL, e));
        }
    }
}