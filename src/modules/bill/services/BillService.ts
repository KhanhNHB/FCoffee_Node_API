import { NotFoundError } from "routing-controllers";
import { isUndefined } from "util";
import { TableService } from "../../table/services";
import { ModelUtils } from "../../utils";
import { DaoBill } from "../daos";
import { BillDao } from "../daos/BillDao";
import { Bill } from "./models/Bill";
import { BillByCurrentStaff } from "./models/BillByCurrentStaff";
import { BillCreation } from "./models/BillCreation";
import { BillUpdation } from "./models/BillUpdation";

export class BillService {
    billDao: BillDao;

    constructor() {
        this.billDao = new BillDao();
    }

    async getBills(): Promise<any> {
        return await this.billDao.getBills();
    }

    async getBillById(id: string): Promise<Bill> {
        const daoBill = await this.billDao.getBillById(id);
        if (isUndefined(daoBill) || !daoBill) {
            throw new NotFoundError(`Not found bill by id ${id}`);
        }
        const bill = new Bill().toBill(daoBill);
        return bill;
    }

    async getBillByCurrentUser(auth: any): Promise<any> {
        const tableService = new TableService();

        const daoBills = await this.billDao.getBillByCurrentUser(auth.data.username);
        if (isUndefined(daoBills) || !daoBills.length) {
            throw new NotFoundError(`Not found bill by user ${auth.data.username}`);
        }

        let billsByCurrentStaff: BillByCurrentStaff[] = [];

        for (const daoBill of daoBills) {
            const table = await tableService.getTableById(daoBill.table_id);
            const billByCurrentStaff = new BillByCurrentStaff().toBillByCurrentStaff(daoBill);
            billByCurrentStaff.table_name = table.name;

            billsByCurrentStaff.push(billByCurrentStaff);
        }

        const result = billsByCurrentStaff.sort((a: any, b: any): any => {
            return +new Date(b.created_at) - +new Date(a.created_at);
        });


        return result;
    }

    async getBillByTableId(table_id: string): Promise<Bill> {
        const daoBill = await this.billDao.getBillByTableId(table_id);
        if (isUndefined(daoBill) || !daoBill) {
            throw new NotFoundError(`Not found bill by table id ${table_id}`);
        }
        const bill = new Bill().toBill(daoBill);
        return bill;
    }

    async getTotalBillById(id: string): Promise<Bill> {
        const daoBill = await this.billDao.getBillById(id);
        const bill = new Bill().toBill(daoBill);
        return bill;
    }


    async create(req: BillCreation): Promise<Boolean> {
        // TODO: Authorized
        // TODO: Check validate
        const daoBill = new DaoBill().toDaoBill(req);
        return await this.billDao.create(daoBill);
    }

    async update(req: BillUpdation): Promise<Boolean> {
        // TODO: Authorized
        const bill = await this.getBillById(req.id);
        const daoBill = new DaoBill().toDaoBill(bill);
        const daoBillUpdared = ModelUtils.assign(daoBill, req);
        return await this.billDao.update(daoBillUpdared);
    }

    async updateTotalById(id: string, total: number): Promise<Boolean> {
        // TODO: Authorized
        return await this.billDao.updateTotal(id, total);
    }
}