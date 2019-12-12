import { Response } from "express";
import { Body, Get, JsonController, Param, Post, Put, Res } from "routing-controllers";
import { HttpStatus, HttpStatusCode } from "../../../common/HttpStatus";
import { ResponseEntity } from "../../../utils";
import { BillInfoService } from "../services";
import { BillInfoCreation } from "../services/models/BillInfoCreation";
import { BillInfoUpdation } from "../services/models/BillInfoUpdation";

@JsonController("/billinfos")
export class BillInfoRest {
    billInfoService: BillInfoService;

    constructor(billInfoService: BillInfoService) {
        this.billInfoService = new BillInfoService();
    }

    @Get("")
    async getAll(@Res() res: Response): Promise<any> {
        try {
            const billInfos = await this.billInfoService.getBillInfos();
            return res.send(ResponseEntity.ok(billInfos));
        } catch (err) {
            return res
                .status(HttpStatusCode.NOT_FOUND)
                .send(ResponseEntity.ok(null, HttpStatus.FAIL, err));
        }
    }

    @Get("/:bill_id")
    async getBillInfoDetailByBillId(@Param("bill_id") bill_id: string, @Res() res: Response): Promise<any> {
        try {
            const billInfo = await this.billInfoService.getBillInfoDetailByBillId(bill_id);
            if (!billInfo) res
                .status(HttpStatusCode.NOT_FOUND)
                .send(ResponseEntity.ok(null, HttpStatus.FAIL));

            return res.send(ResponseEntity.ok(billInfo));
        } catch (err) {
            return res
                .status(HttpStatusCode.NOT_FOUND)
                .send(ResponseEntity.ok(null, HttpStatus.FAIL, err));
        }
    }

    @Post("")
    async create(
        @Body() req: BillInfoCreation,
        @Res() res: Response
    ): Promise<any> {
        try {
            const result = await this.billInfoService.create(req);
            return res
                .status(HttpStatusCode.CREATED)
                .send(ResponseEntity.ok(result));
        } catch (err) {
            return res
                .status(HttpStatusCode.NOT_FOUND)
                .send(ResponseEntity.ok(null, HttpStatus.FAIL, err));
        }
    }

    // @Put("/:id")
    // async update(
    //     @Body() req: BillInfoUpdation,
    //     @Param("id") id: string,
    //     @Res() res: Response
    // ): Promise<any> {
    //     try {
    //         req.id = id;
    //         let result = await this.billInfoService.update(req);
    //         return res.send(ResponseEntity.ok(result));
    //     } catch (error) {
    //         return res
    //             .status(HttpStatusCode.NOT_FOUND)
    //             .send(ResponseEntity.ok(null, HttpStatus.FAIL, error));
    //     }
    // }
}