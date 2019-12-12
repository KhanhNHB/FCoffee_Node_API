import { IsOptional } from "class-validator";
import { ModelUtils } from "../../../../utils";

export class BillInfo {
    @IsOptional()
    id: string = "";
    @IsOptional()
    bill_id: string = "";
    @IsOptional()
    product_id: string = "";
    @IsOptional()
    quantity: number = 1;
    @IsOptional()
    price: number = 0;
    @IsOptional()
    disable: boolean = false;

    constructor(init?: BillInfo) {
        ModelUtils.assign(this, init);
    }

    toBillInfo(init?: any): BillInfo {
        return ModelUtils.assign(this, init);
    }
}