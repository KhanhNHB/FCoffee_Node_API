import { ModelUtils } from "../../../utils";

export class DaoBill {
    id: string = "";
    table_id: string = "";
    paid: boolean = false;
    discount: number = 0.0;
    total: number = 0.0;
    created_at: string = "";
    created_by_id: string = "";

    constructor(init?: any) {
        ModelUtils.assign(this, init);
    }

    toDaoBill(init?: any): DaoBill {
        return ModelUtils.assign(this, init);
    }
}