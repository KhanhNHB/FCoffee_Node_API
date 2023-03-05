import { Response } from "express";
import { Authorized, Body, CurrentUser, Get, JsonController, Param, Post, Put, Res, Delete } from "routing-controllers";
import { AuthToken } from "../../auth/services/models/AuthToken";
import { HttpStatus, HttpStatusCode } from "../../common/HttpStatus";
import { ResponseEntity } from "../../utils";
import { TableService } from "../services";
import { TableUpdation } from "../services/models/TableUpdation";
import { TableRemoveProductItem } from "../services/models/TableRemoveProductItem";

@JsonController("/tables")
export class TableRest {
    tableService: TableService;

    constructor() {
        this.tableService = new TableService();
    }

    @Authorized()
    @Get("")
    async getAll(@Res() res: Response, @CurrentUser() auth: AuthToken): Promise<any> {
        try {
            const tables = await this.tableService.getTables();
            return res.send(ResponseEntity.ok(tables));
        } catch (err) {
            console.log(`Error get all table ${err}`);
            return res
                .status(HttpStatusCode.NOT_FOUND)
                .send(ResponseEntity.error(null, HttpStatus.FAIL, err));
        }
    }

    @Authorized()
    @Get("/:id")
    async getDetail(@Param("id") id: string, @Res() res: Response, @CurrentUser() auth: AuthToken): Promise<any> {
        try {
            const table = await this.tableService.getTableDetail(id);
            if (!table) res
                .status(HttpStatusCode.NOT_FOUND)
                .send(ResponseEntity.ok(null, HttpStatus.FAIL));
            return res.send(ResponseEntity.ok(table));
        } catch (err) {
            console.log(`Error get detail table by id ${id}, ${err}`);
            return res
                .status(HttpStatusCode.NOT_FOUND)
                .send(ResponseEntity.error(null, HttpStatus.FAIL, err));
        }
    }

    @Authorized()
    @Post("")
    async create(
        @Res() res: Response,
        @CurrentUser() auth: AuthToken
    ): Promise<any> {
        try {
            const result = await this.tableService.create(auth);
            return res
                .status(HttpStatusCode.CREATED)
                .send(ResponseEntity.ok(result));
        } catch (err) {
            console.log(`Error create table ${err}`);
            return res
                .status(HttpStatusCode.NOT_FOUND)
                .send(ResponseEntity.error(null, HttpStatus.FAIL, err));
        }
    }

    @Authorized()
    @Put("/:id/checkIn")
    async checkIn(
        @Param("id") id: string,
        @Body() req: TableUpdation,
        @CurrentUser() auth: any,
        @Res() res: Response
    ): Promise<any> {
        try {
            req.id = id;
            const result = await this.tableService.checkIn(req, auth);
            return res.send(ResponseEntity.ok(result));
        } catch (err) {
            console.log(`Error check in table by id ${id}, ${err}`);
            return res
                .status(HttpStatusCode.NOT_FOUND)
                .send(ResponseEntity.error(null, HttpStatus.FAIL, err));
        }
    }

    @Authorized()
    @Put("/:id/checkOut")
    async checkOut(
        @Param("id") id: string,
        @CurrentUser() auth: AuthToken,
        @Res() res: Response
    ): Promise<any> {
        try {
            const result = await this.tableService.checkOut(id, auth);
            return res.send(ResponseEntity.ok(result));
        } catch (err) {
            console.log(`Error check-out table by id ${id}, ${err}`);
            return res
                .status(HttpStatusCode.NOT_FOUND)
                .send(ResponseEntity.error(null, HttpStatus.FAIL, err));
        }
    }

    @Authorized()
    @Put("/:id/custom")
    async deleteProductItem(
        @Param("id") id: string,
        @Body() req: TableRemoveProductItem,
        @CurrentUser() auth: AuthToken,
        @Res() res: Response
    ): Promise<any> {
        try {
            req.table_id = id;
            const result = await this.tableService.deleteProductItem(req, auth);
            return res.send(ResponseEntity.ok(result));
        } catch (err) {
            console.log(`Error clean table by id ${id}, ${err}`);
            return res
                .status(HttpStatusCode.METHOD_NOT_ALLOWED)
                .send(ResponseEntity.error(null, HttpStatus.FAIL, err));
        }
    }
}