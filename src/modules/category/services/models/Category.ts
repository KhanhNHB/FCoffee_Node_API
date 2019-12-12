import { ModelUtils } from "../../../utils";
import { IsOptional } from "class-validator";
import { DaoCategory } from "../../daos";

export class Category {
    @IsOptional()
    id: string;
    @IsOptional()
    name: string;
    @IsOptional()
    disable: boolean = false;
    @IsOptional()
    created_at: string;
    @IsOptional()
    created_by_id: string;
    @IsOptional()
    updated_at: string;
    @IsOptional()
    updated_by_id: string;

    constructor(init?: Category) {
        ModelUtils.assign(this, init);
    }

    toCategory(init?: DaoCategory): Category {
        return ModelUtils.assign(this, init);
    }
}