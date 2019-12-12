import { IsOptional } from "class-validator";
import { ModelUtils } from "../../../../utils";

export class BillInfoUpdation {
    @IsOptional()
    id: string;
    @IsOptional()
    product_id: string;
    @IsOptional()
    quantity: number = 1;

    constructor(init?: BillInfoUpdation) {
        ModelUtils.assign(this, init);
    }
}