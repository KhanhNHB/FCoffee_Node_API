import { ModelUtils } from "../../../utils";

export class ProductDetail {
    id: string = "";
    name: string = "";
    image: string = "";
    quantity: number = 1;
    price: number = 0.0;

    constructor(init?: ProductDetail) {
        ModelUtils.assign(this, init);
    }

    toProductDetail(init?: any): ProductDetail {
        return ModelUtils.assign(this, init);
    }
}