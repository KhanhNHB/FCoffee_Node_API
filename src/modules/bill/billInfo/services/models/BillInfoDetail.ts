import { ModelUtils } from "../../../../utils";

export class BillInfoDetail {
    name: string = "";
    quantity: number = 0;
    price: number = 0.0;
    total_price: number = 0.0;

    constructor(init?: BillInfoDetail) {
        ModelUtils.assign(this, init);
    }

    toBillInfoDetail(init?: any): BillInfoDetail {
        return ModelUtils.assign(this, init);
    }
}