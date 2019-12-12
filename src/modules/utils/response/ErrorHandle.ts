import { Middleware, ExpressErrorMiddlewareInterface } from "routing-controllers";

@Middleware({ type: "after" })
export class ErrorHandle implements ExpressErrorMiddlewareInterface {

    error(error: any, request: any, response: any, next: (err?: any) => any) {
        next();
    }
}