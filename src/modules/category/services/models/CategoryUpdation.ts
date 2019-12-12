import { ModelUtils } from "../../../utils";
import { IsNotEmpty, IsOptional, IsBoolean, IsDate } from "class-validator";

export class CategoryUpdation {
    @IsOptional()
    id: string;
    @IsNotEmpty()
    name: string;
    @IsOptional()
    updated_at: string;
    @IsNotEmpty()
    updated_by_id: string;

    constructor(init?: CategoryUpdation) {
        ModelUtils.assign(this, init);
    }
}