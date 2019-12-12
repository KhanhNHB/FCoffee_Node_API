import { ModelUtils } from "../../../utils";
import { IsOptional, IsNotEmpty, IsBoolean } from "class-validator";
import { DaoAccount } from "../../daos/models/DaoAccount";

export class Account {
    @IsNotEmpty()
    username: string = "";
    @IsNotEmpty()
    password: string = "";
    @IsOptional()
    @IsBoolean()
    disable: boolean = false;
    @IsOptional()
    fullname: string = "";
    @IsOptional()
    role: number = 0;
    @IsOptional()
    image: string = "";
    @IsOptional()
    created_at: string = "";
    @IsOptional()
    updated_at: string = "";

    constructor(init?: any) {
        ModelUtils.assign(this, init);
    }

    toAccount(init?: DaoAccount): Account {
        return ModelUtils.assign(this, init);
    }
}