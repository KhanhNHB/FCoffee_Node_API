import { ModelUtils } from "../../../utils";

export class TableRemoveProductItem {
    table_id: string = "";
    bill_id: string = "";
    product_id: string = "";
    product_quantity: number = 0;
    product_price: number = 0.0;

    constructor(init?: TableRemoveProductItem) {
        ModelUtils.assign(this, init);
    }
}