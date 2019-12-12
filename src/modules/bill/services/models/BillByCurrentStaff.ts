import { ModelUtils } from "../../../utils";

export class BillByCurrentStaff {
    id: string = "";
    table_name: string = "";
    total: number = 0.0;
    created_at: string = "";

    constructor(init?: BillByCurrentStaff) {
        ModelUtils.assign(this, init);
    }

    toBillByCurrentStaff(init?: any): BillByCurrentStaff {
        return ModelUtils.assign(this, init);
    }
}