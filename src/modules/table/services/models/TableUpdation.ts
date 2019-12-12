import { IsOptional } from "class-validator";
import { ModelUtils } from "../../../utils";
import { ProductOrder } from "../../../product/services/models/ProductOrder";

export class TableUpdation {
    @IsOptional()
    id: string = "";
    @IsOptional()
    available: boolean = true;
    @IsOptional()
    products: Array<ProductOrder> = [];

    constructor(init?: TableUpdation) {
        ModelUtils.assign(this, init);
    }
}