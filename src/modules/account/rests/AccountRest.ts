import { Request, Response } from "express";
import { Authorized, Body, Delete, Get, JsonController, Param, Post, Put, Req, Res } from "routing-controllers";
import { HttpStatus } from "../../common/HttpStatus";
import { ResponseEntity } from "../../utils";
import { AccountSerivce } from "../services/AccountService";
import { AccountCreation } from "../services/models/AccountCreation";
import { AccountUpdation } from "../services/models/AccountUpdation";

@JsonController("/accounts")
export class AccountRest {
    accountService: AccountSerivce;

    constructor() {
        this.accountService = new AccountSerivce();
    }

    @Authorized("Admin")
    @Get("/")
    async getAll(@Res() res: Response): Promise<any> {
        try {
            const accounts = await this.accountService.getAccounts();
            return res.send(ResponseEntity.ok(accounts));
        } catch (err) {
            return res.send(ResponseEntity.error([], HttpStatus.FAIL, err));
        }
    }

    @Authorized()
    @Get("/:username")
    async getDetail(@Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            const account = await this.accountService.getAccountByUsername(req.params.username);
            return res.send(ResponseEntity.ok(account));
        } catch (err) {
            return res.status(404).send(ResponseEntity.error(null, HttpStatus.FAIL, err));
        }
    }

    @Post("")
    async create(
        @Body() req: AccountCreation,
        @Res() res: Response
    ): Promise<any> {
        try {
            const result = await this.accountService.create(req);
            return res.send(ResponseEntity.ok(result));
        } catch (err) {
            console.log(`Error create account ${err}`);
            return res.status(400).send(ResponseEntity.error(false, HttpStatus.FAIL, err));
        }
    }

    @Authorized()
    @Put("/:username")
    async update(
        @Param("username") username: string,
        @Body() req: AccountUpdation,
        @Res() res: Response
    ): Promise<any> {
        try {
            req.username = username;
            const result = await this.accountService.update(req);
            return res.send(ResponseEntity.ok(result));
        } catch (error) {
            return res.send(ResponseEntity.error(null, HttpStatus.FAIL, error));
        }
    }

    @Authorized()
    @Delete("/:username")
    async delete(
        @Param("username") username: string,
        @Res() res: Response
    ): Promise<any> {
        try {
            let result = await this.accountService.delete(username);
            return res.send(ResponseEntity.ok(result));
        } catch (error) {
            return res.send(ResponseEntity.error(null, HttpStatus.FAIL, error));
        }
    }
}
