import { Response } from "express";
import { Authorized, Body, Get, JsonController, Param, Post, Put, Res, CurrentUser } from "routing-controllers";
import { HttpStatus, HttpStatusCode } from "../../common/HttpStatus";
import { ResponseEntity } from "../../utils";
import { BillService } from "../services";
import { BillCreation } from "../services/models/BillCreation";
import { BillUpdation } from "../services/models/BillUpdation";
import { AuthToken } from "../../auth/services/models/AuthToken";

@JsonController("/bills")
export class BillRest {
    billService: BillService;

    constructor() {
        this.billService = new BillService();
    }

    @Authorized()
    @Get("")
    async getAll(@Res() res: Response): Promise<any> {
        try {
            const bills = await this.billService.getBills();
            return res.send(ResponseEntity.ok(bills));
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
            const bill = await this.billService.getBillById(id);
            if (!bill) res
                .status(HttpStatusCode.NOT_FOUND)
                .send(ResponseEntity.ok(null, HttpStatus.FAIL));

            return res.send(ResponseEntity.ok(bill));
        } catch (err) {
            return res
                .status(HttpStatusCode.NOT_FOUND)
                .send(ResponseEntity.ok(null, HttpStatus.FAIL, err));
        }
    }

    @Authorized()
    @Get("/staffs/current-staff")
    async getByCurrentUser(@Res() res: Response, @CurrentUser() auth: AuthToken): Promise<any> {
        try {
            const bill = await this.billService.getBillByCurrentUser(auth);
            if (!bill) res
                .status(HttpStatusCode.NOT_FOUND)
                .send(ResponseEntity.ok(null, HttpStatus.FAIL));
            return res.send(ResponseEntity.ok(bill));
        } catch (err) {
            return res
                .status(HttpStatusCode.NOT_FOUND)
                .send(ResponseEntity.ok(null, HttpStatus.FAIL, err));
        }
    }

    @Authorized()
    @Post("")
    async create(
        @Body() req: BillCreation,
        @Res() res: Response
    ): Promise<any> {
        try {
            const result = await this.billService.create(req);
            return res
                .status(HttpStatusCode.CREATED)
                .send(ResponseEntity.ok(result));
        } catch (err) {
            return res
                .status(HttpStatusCode.NOT_FOUND)
                .send(ResponseEntity.ok(null, HttpStatus.FAIL, err));
        }
    }

    @Authorized()
    @Put("/:id")
    async update(
        @Body() req: BillUpdation,
        @Param("id") id: string,
        @Res() res: Response
    ): Promise<any> {
        try {
            req.id = id;
            const result = await this.billService.update(req);
            return res.send(ResponseEntity.ok(result));
        } catch (error) {
            return res
                .status(HttpStatusCode.NOT_FOUND)
                .send(ResponseEntity.ok(null, HttpStatus.FAIL, error));
        }
    }

    // @Delete("/:id")
    // async delete(@Req() req: Request, @Res() res: Response): Promise<any> {
    //     try {
    //         let result = await this.billService.delete(req.params.id);
    //         return res.send(ResponseEntity.ok(result));
    //     } catch (e) {
    //         return res.status(404).send(ResponseEntity.ok(null, HttpStatus.FAIL, e));
    //     }
    // }
}
