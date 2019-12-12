import { ModelUtils } from "../../../utils";
import { DaoAuth } from "../../daos/models/DaoAuth";
import { IsOptional } from "class-validator";

export class AuthToken {
    @IsOptional()
    username: string = "";
    @IsOptional()
    access_token: string = "";
    @IsOptional()
    expires_in: string = "";
    @IsOptional()
    role: string = "";

    constructor(init?: AuthToken) {
        ModelUtils.assign(this, init);
    }

    toAuthToken(init?: DaoAuth): AuthToken {
        return ModelUtils.assign(this, init);
    }
}