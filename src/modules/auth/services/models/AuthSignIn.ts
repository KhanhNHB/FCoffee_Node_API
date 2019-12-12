import { IsNotEmpty } from "class-validator";
import { ModelUtils } from "../../../utils";

export class AuthSignIn {
    @IsNotEmpty()
    username: string = "";
    @IsNotEmpty()
    password: string = "";

    constructor(init?: AuthSignIn) {
        ModelUtils.assign(this, init);
    }
}