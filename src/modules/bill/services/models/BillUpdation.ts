import { IsOptional } from "class-validator";
import { ModelUtils } from "../../../utils";

export class BillUpdation {
    @IsOptional()
    id: string = "";
    @IsOptional()
    paid: boolean = false;
    @IsOptional()
    discount: number = 0.0;
    @IsOptional()
    total: number = 0.0;
    @IsOptional()
    created_by_id: string = "";

    constructor(init?: BillUpdation) {
        ModelUtils.assign(this, init);
    }

    toBillUpdation(init: any): BillUpdation {
        return ModelUtils.assign(this, init);
    }
}