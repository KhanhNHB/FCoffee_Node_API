import { ModelUtils } from "../../../utils";

export class DaoCategory {
    id: string;
    name: string;
    disable: boolean = false;
    created_at: string;
    created_by_id: string;
    updated_at: string;
    updated_by_id: string;

    constructor(init?: any) {
        ModelUtils.assign(this, init);
    }

    toDaoCategory(init?: any): DaoCategory {
        return ModelUtils.assign(this, init);
    }
}