import { IsNotEmpty, IsOptional } from "class-validator";
import { ModelUtils } from "../../../utils";

export class AccountCreation {
    @IsNotEmpty()
    username: string = "";
    @IsNotEmpty()
    password: string = "";
    @IsOptional()
    token: string = "";

    constructor(init?: AccountCreation) {
        ModelUtils.assign(this, init);
    }
}