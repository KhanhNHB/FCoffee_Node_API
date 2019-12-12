import { IsOptional } from "class-validator";
import { ModelUtils } from "../../../utils";

export class ProductOrder {
    @IsOptional()
    id: string = "";
    @IsOptional()
    price: number = 0.0;
    @IsOptional()
    image: string = "";
    @IsOptional()
    quantity: number = 1;
    @IsOptional()
    is_plus: boolean = false;
    @IsOptional()
    is_sub: boolean = false;

    constructor(init?: ProductOrder) {
        ModelUtils.assign(this, init);
    }

    toProductOrder(init?: any): ProductOrder {
        return ModelUtils.assign(this, init);
    }
}