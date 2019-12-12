import { ModelUtils } from "../../../utils";

export class DaoAuth {
    username: string = "";
    password: string = "";
    disable: boolean = false;
    fullname: string = "";
    role: number = 0;
    image: string = "";
    created_at: string = "";
    updated_at: string = "";

    constructor(init?: DaoAuth) {
        ModelUtils.assign(this, init);
    }

    toDaoAuth(init?: any): DaoAuth {
        return ModelUtils.assign(new DaoAuth(), init);
    }
}