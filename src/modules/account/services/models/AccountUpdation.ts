import { IsOptional } from "class-validator";
import { ModelUtils } from "../../../utils";

export class AccountUpdation {
    @IsOptional()
    username: string = "";
    @IsOptional()
    first_name: string = "";
    @IsOptional()
    last_name: string = "";
    @IsOptional()
    image: string = "";

    constructor(init?: AccountUpdation) {
        ModelUtils.assign(this, init);
    }
}