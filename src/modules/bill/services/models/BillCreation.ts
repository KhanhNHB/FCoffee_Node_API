import { IsOptional, IsNotEmpty } from "class-validator";
import { ModelUtils } from "../../../utils";

export class BillCreation {
    @IsOptional()
    id: string = "";
    @IsNotEmpty()
    table_id: string = "";
    @IsOptional()
    created_at: string = "";
    @IsNotEmpty()
    created_by_id: string = "";

    constructor(init?: BillCreation) {
        ModelUtils.assign(this, init);
    }
}