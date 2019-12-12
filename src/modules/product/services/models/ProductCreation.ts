import { IsNotEmpty, IsOptional } from "class-validator";
import { ModelUtils } from "../../../utils";

export class ProductCreation {
    @IsOptional()
    id: string = "";
    @IsNotEmpty()
    name: string = "";
    @IsOptional()
    price: number;
    @IsOptional()
    description: string = "";
    @IsNotEmpty()
    category_id: string = "";
    @IsOptional()
    image: string = "";
    @IsNotEmpty()
    created_by_id: string = "";

    constructor(init?: ProductCreation) {
        ModelUtils.assign(this, init);
    }
}