import { HttpStatus } from "../../common/HttpStatus";

export class ResponseEntity<T> {
    status: string;
    data: T;
    error: T;

    constructor(data: T, status: string, error?: T) {
        this.status = status;
        this.data = data;
        if (error) {
            this.error = error;
        }
    }

    static ok<T>(
        data: T,
        status: string = HttpStatus.OK,
        error?: T
    ): ResponseEntity<T> {
        return new ResponseEntity(data, status, error);
    }

    static error<T>(data: T, status: string = HttpStatus.FAIL, message: any): ResponseEntity<T> {
        return new ResponseEntity(data, status, message);
    }
}