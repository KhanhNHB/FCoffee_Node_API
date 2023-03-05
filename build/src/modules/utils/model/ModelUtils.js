"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelUtils = void 0;
const lodash_1 = require("lodash");
class ModelUtils {
    static assign(obj1, obj2) {
        if (!obj2)
            return;
        const keys = Object.keys(obj1);
        for (let key of keys) {
            obj1[key] = typeof obj2[key] !== "undefined" ? obj2[key] : obj1[key];
        }
        return obj1;
    }
    static getKeys(obj) {
        const keyObj = lodash_1.keys(obj);
        let result = "(";
        keyObj.map((key, index) => {
            result += key;
            if (index !== keyObj.length - 1) {
                result += ", ";
            }
        });
        result += ")";
        return result;
    }
    static getValues(obj) {
        const valueObj = lodash_1.values(obj);
        let result = "(";
        valueObj.map((value, index) => {
            if (typeof value === "string") {
                result += "'" + value + "'";
            }
            else {
                result += value;
            }
            if (index !== valueObj.length - 1)
                result += ", ";
        });
        result += ")";
        return result;
    }
    static getQuestionMarks(obj) {
        const keyObj = lodash_1.keys(obj);
        let result = "(";
        keyObj.map((key, index) => {
            result += "?";
            if (index !== keyObj.length - 1) {
                result += ", ";
            }
        });
        result += ")";
        return result;
    }
    static getKeyUpdate(obj) {
        const keyObj = lodash_1.keys(obj);
        let result = "";
        keyObj.map((key, index) => {
            result += key + " = ?";
            if (index !== keyObj.length - 1) {
                result += ", ";
            }
        });
        return result;
    }
    static Row(obj) {
        if (!obj)
            return;
    }
    static Pagable(obj) { }
}
exports.ModelUtils = ModelUtils;
