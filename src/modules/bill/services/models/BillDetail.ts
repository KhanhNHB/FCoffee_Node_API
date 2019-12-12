import { IsOptional } from "class-validator";
import { ModelUtils } from "../../../utils";

export class BillDetail {
    @IsOptional()
    id: string = "";
    @IsOptional()
    discount: number = 0.0;
    @IsOptional()
    total: number = 0.0;

    constructor(init?: BillDetail) {
        ModelUtils.assign(this, init);
    }

    toBillDetail(init?: any): BillDetail {
        return ModelUtils.assign(this, init);
    }
}