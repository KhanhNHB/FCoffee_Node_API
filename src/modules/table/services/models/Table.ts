import { ModelUtils } from "../../../utils";
import { IsOptional } from "class-validator";
import { DaoTable } from "../../daos/models/DaoTable";

export class Table {
    @IsOptional()
    id: string = "";
    @IsOptional()
    name: string = "";
    @IsOptional()
    available: boolean = true;

    constructor(init?: Table) {
        ModelUtils.assign(this, init);
    }

    toTable(init?: DaoTable): Table {
        return ModelUtils.assign(this, init);
    }
}