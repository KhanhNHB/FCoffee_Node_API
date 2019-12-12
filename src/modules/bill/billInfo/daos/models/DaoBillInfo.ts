import { ModelUtils } from "../../../../utils";

export class DaoBillInfo {
    id: string = "";
    bill_id: string = "";
    product_id: string = "";
    price: number = 0;
    disable: boolean = false;
    quantity: number = 1;

    constructor(init?: any) {
        ModelUtils.assign(this, init);
    }

    toDaoBillInfo(init?: any): DaoBillInfo {
        return ModelUtils.assign(this, init);
    }
}