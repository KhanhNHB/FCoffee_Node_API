import * as jwt from "jsonwebtoken";
import morgan from "morgan";
import "reflect-metadata";
import { Action, createExpressServer } from "routing-controllers";
import { AccountRest } from "./modules/account/rests/AccountRest";
import { AuthRest } from "./modules/auth/rests/AuthRest";
import { BillInfoRest } from "./modules/bill/billInfo/rests/BillInfoRest";
import { BillRest } from "./modules/bill/rests/BillRest";
import { CategoryRest } from "./modules/category/rests/CategoryRest";
import { HttpStatus } from "./modules/common/HttpStatus";
import { Secret } from "./modules/common/Secret";
import { ProductRest } from "./modules/product/rests/ProductRest";
import { TableRest } from "./modules/table/rests/TableRest";
import { ResponseEntity } from "./modules/utils";
import { ErrorHandle } from "./modules/utils/response/ErrorHandle";

const port = process.env.PORT || 9000;

const app = createExpressServer({
    currentUserChecker: async (action: Action) => {
        const bearerHeader = action.request.headers["authorization"];
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];

        const result = jwt.verify(token, Secret.Key);
        return result;
    },
    authorizationChecker: async (action: Action, roles: string[]) => {
        const bearerHeader = action.request.headers["authorization"];
        if (typeof bearerHeader === 'undefined') {
            action.response.status(403).send(ResponseEntity.error(false, HttpStatus.FAIL, "Forbidden"));
            return false;
        }

        // const user = await getEntityManager().findOneByToken(User, token);
        // if (user && !roles.length)
        //     return true;
        // if (user && roles.find(role => user.roles.indexOf(role) !== -1))
        //     return true;


        const bearer = bearerHeader.split(' ');
        const token = bearer[1];

        const result = jwt.verify(token, Secret.Key);
        return result ? true : false;
    },
    validation: true,
    defaultErrorHandler: false,
    middlewares: [ErrorHandle],
    controllers: [AuthRest, AccountRest, ProductRest, CategoryRest, TableRest, BillRest, BillInfoRest]
});

app.use(morgan("dev"));

app.listen(port, () => {
    console.log(`Application run on port ${port}`);
});