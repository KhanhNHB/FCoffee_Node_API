import { IsOptional, IsNotEmpty } from "class-validator";
import { ModelUtils } from "../../../../utils";

export class BillInfoCreation {
    @IsOptional()
    id: string = "";
    @IsNotEmpty()
    bill_id: string = "";
    @IsNotEmpty()
    product_id: string = "";
    @IsOptional()
    quantity: number = 1;
    @IsOptional()
    price: number = 0.0;
    @IsOptional()
    disable: boolean = false;
    @IsOptional()
    is_plus: boolean = true;
    @IsOptional()
    is_sub: boolean = true;

    constructor(init?: BillInfoCreation) {
        ModelUtils.assign(this, init);
    }

    toBillInfoCreation(init?: any): BillInfoCreation {
        return ModelUtils.assign(this, init);
    }
}