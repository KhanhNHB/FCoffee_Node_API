"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const moment = require("moment");
class DateUtils {
    constructor() { }
    static getDate() {
        return lodash_1.now();
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
    static formatDate(date) {
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
    }
}
exports.DateUtils = DateUtils;
