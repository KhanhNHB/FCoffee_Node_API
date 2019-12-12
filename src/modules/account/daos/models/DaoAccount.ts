import { ModelUtils } from "../../../utils";

export class DaoAccount {
    username: string = "";
    password: string = "";
    disable: boolean;
    fullname: string = "";
    role: number = 0;
    image: string = "";
    created_at: string = "";
    updated_at: string = "";

    constructor(init?: DaoAccount) {
        ModelUtils.assign(this, init);
    }

    toDaoAccount(init?: any): DaoAccount {
        return ModelUtils.assign(this, init);
    }
}
