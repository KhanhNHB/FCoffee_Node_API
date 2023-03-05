"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseEntity = void 0;
const HttpStatus_1 = require("../../common/HttpStatus");
class ResponseEntity {
    constructor(data, status, error) {
        this.status = status;
        this.data = data;
        if (error) {
            this.error = error;
        }
    }
    static ok(data, status = HttpStatus_1.HttpStatus.OK, error) {
        return new ResponseEntity(data, status, error);
    }
    static error(data, status = HttpStatus_1.HttpStatus.FAIL, message) {
        return new ResponseEntity(data, status, message);
    }
}
exports.ResponseEntity = ResponseEntity;
