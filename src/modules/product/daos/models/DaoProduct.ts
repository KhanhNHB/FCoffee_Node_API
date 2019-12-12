import { ModelUtils } from "../../../utils";

export class DaoProduct {
    id: string = "";
    name: string = "";
    price: number = 0;
    disable: boolean = false;
    description: string = "";
    category_id: string = "";
    image: string = "";
    created_at: string = "";
    created_by_id: string = "";
    updated_at: string = "";
    updated_by_id: string = "";

    constructor(init?: any) {
        ModelUtils.assign(this, init);
    }

    toDaoProduct(init?: any): DaoProduct {
        return ModelUtils.assign(this, init);
    }
}