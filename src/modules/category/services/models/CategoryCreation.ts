import { IsNotEmpty, IsOptional } from "class-validator";
import { ModelUtils } from "../../../utils";

export class CategoryCreation {
    @IsOptional()
    id: string;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    created_by_id: string;
    @IsOptional()
    created_at: string;

    constructor(init?: CategoryCreation) {
        ModelUtils.assign(this, init);
    }
}