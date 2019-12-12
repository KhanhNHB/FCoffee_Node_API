import { ModelUtils } from "../../../utils";
import { DaoProduct } from "../../daos";
import { IsOptional } from "class-validator";

export class Product {
    @IsOptional()
    id: string = "";
    @IsOptional()
    name: string = "";
    @IsOptional()
    price: number = 0.0;
    @IsOptional()
    disable: boolean = false;
    @IsOptional()
    description: string = "";
    @IsOptional()
    category_id: string = "";
    @IsOptional()
    image: string = "";
    @IsOptional()
    created_at: string = "";
    @IsOptional()
    created_by_id: string = "";
    @IsOptional()
    updated_at: string = "";
    @IsOptional()
    updated_by_id: string = "";

    constructor(init?: Product) {
        ModelUtils.assign(this, init);
    }

    toProduct(init?: DaoProduct): Product {
        return ModelUtils.assign(this, init);
    }
}