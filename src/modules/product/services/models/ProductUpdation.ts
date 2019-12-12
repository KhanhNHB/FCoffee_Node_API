import { ModelUtils } from "../../../utils";
import { IsNotEmpty, IsOptional, IsBoolean, IsDate } from "class-validator";

export class ProductUpdation {
    @IsOptional()
    id: string = "";
    @IsNotEmpty()
    name: string = "";
    @IsOptional()
    price: number = 0.0;
    @IsOptional()
    @IsBoolean()
    disable: boolean = false;
    @IsOptional()
    description: string = "";
    @IsOptional()
    @IsNotEmpty()
    category_id: string = "";
    @IsOptional()
    image: string = "";
    @IsOptional()
    updated_by_id: string = "";

    constructor(init?: ProductUpdation) {
        ModelUtils.assign(this, init);
    }
}