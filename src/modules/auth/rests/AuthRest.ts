import { Response } from "express";
import { Body, JsonController, Post, Res } from "routing-controllers";
import { HttpStatus } from "../../common/HttpStatus";
import { ResponseEntity } from "../../utils";
import { AuthService } from "../services/AuthService";
import { AuthSignIn } from "../services/models/AuthSignIn";

@JsonController("/auth")
export class AuthRest {
    authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    @Post("/sign_in")
    async signIn(@Body() req: AuthSignIn, @Res() res: Response): Promise<any> {
        try {
            const result = await this.authService.checkSignIn(req);
            return res.send(ResponseEntity.ok(result));
        } catch (error) {
            return res
                .status(404)
                .send(ResponseEntity.ok(null, HttpStatus.FAIL, error));
        }
    }
}