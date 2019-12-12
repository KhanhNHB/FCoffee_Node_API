import { ModelUtils } from "../../../utils";

export class DaoTable {
    id: string = "";
    name: string = "";
    available: boolean = true;

    constructor(init?: any) {
        ModelUtils.assign(this, init);
    }

    toDaoTable(init?: any): DaoTable {
        return ModelUtils.assign(this, init);
    }
}