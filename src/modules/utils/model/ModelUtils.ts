import { keys, values } from "lodash";

export class ModelUtils {
    static assign(obj1: any, obj2: any) {
        if (!obj2) return;
        const keys = Object.keys(obj1);
        for (let key of keys) {
            obj1[key] = typeof obj2[key] !== "undefined" ? obj2[key] : obj1[key];
        }
        return obj1;
    }

    static getKeys(obj: any) {
        const keyObj = keys(obj);
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

    static getValues(obj: any) {
        const valueObj = values(obj);
        let result = "(";

        valueObj.map((value, index) => {
            if (typeof value === "string") {
                result += "'" + value + "'";
            } else {
                result += value;
            }

            if (index !== valueObj.length - 1)
                result += ", ";
        });

        result += ")";
        return result;
    }

    static getQuestionMarks(obj: any) {
        const keyObj = keys(obj);
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

    static getKeyUpdate(obj: any) {
        const keyObj = keys(obj);
        let result = "";

        keyObj.map((key, index) => {
            result += key + " = ?";
            if (index !== keyObj.length - 1) {
                result += ", ";
            }
        });

        return result;
    }

    static Row(obj: any) {
        if (!obj) return;
    }

    static Pagable<T>(obj: T) { }
}