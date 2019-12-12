import { ModelUtils } from "../../../utils";
import { IsOptional } from "class-validator";
import { DaoBill } from "../../daos";

export class Bill {
    @IsOptional()
    id: string = "";
    @IsOptional()
    table_id: string = "";
    @IsOptional()
    paid: boolean = false;
    @IsOptional()
    discount: number = 0.0;
    @IsOptional()
    total: number = 0.0;
    @IsOptional()
    created_at: string = "";
    @IsOptional()
    created_by_id: string = "";

    constructor(init?: Bill) {
        ModelUtils.assign(this, init);
    }

    toBill(init?: DaoBill): Bill {
        return ModelUtils.assign(this, init);
    }
}