import { BillDetail } from "../../../bill/services/models/BillDetail";
import { ProductDetail } from "../../../product/services/models/ProductDetail";
import { ModelUtils } from "../../../utils";

export class TableDetail {
    id: string = "";
    available: boolean = false;
    bill: BillDetail;
    products: Array<ProductDetail> = [];

    constructor(init?: TableDetail) {
        ModelUtils.assign(this, init);
    }

    toTableDetail(init: any): TableDetail {
        return ModelUtils.assign(this, init);
    }
}