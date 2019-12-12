import { now } from "lodash";
import moment = require("moment");

export class DateUtils {
    constructor() { }

    static getDate() {
        return now();
    }

    static getDateTime() {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        return new Date(`${day}-${month}-${year} ${hour}:${minute}:${second}+000`);
    }

    static formatDate(date: any) {
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
    }
}
