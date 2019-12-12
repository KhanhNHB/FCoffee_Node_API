"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const morgan_1 = __importDefault(require("morgan"));
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const AccountRest_1 = require("./modules/account/rests/AccountRest");
const AuthRest_1 = require("./modules/auth/rests/AuthRest");
const BillInfoRest_1 = require("./modules/bill/billInfo/rests/BillInfoRest");
const BillRest_1 = require("./modules/bill/rests/BillRest");
const CategoryRest_1 = require("./modules/category/rests/CategoryRest");
const HttpStatus_1 = require("./modules/common/HttpStatus");
const Secret_1 = require("./modules/common/Secret");
const ProductRest_1 = require("./modules/product/rests/ProductRest");
const TableRest_1 = require("./modules/table/rests/TableRest");
const utils_1 = require("./modules/utils");
const ErrorHandle_1 = require("./modules/utils/response/ErrorHandle");
const port = process.env.PORT || 9000;
const app = routing_controllers_1.createExpressServer({
    currentUserChecker: (action) => __awaiter(void 0, void 0, void 0, function* () {
        const bearerHeader = action.request.headers["authorization"];
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        const result = jwt.verify(token, Secret_1.Secret.Key);
        return result;
    }),
    authorizationChecker: (action, roles) => __awaiter(void 0, void 0, void 0, function* () {
        const bearerHeader = action.request.headers["authorization"];
        if (typeof bearerHeader === 'undefined') {
            action.response.status(403).send(utils_1.ResponseEntity.error(false, HttpStatus_1.HttpStatus.FAIL, "Forbidden"));
            return false;
        }
        // const user = await getEntityManager().findOneByToken(User, token);
        // if (user && !roles.length)
        //     return true;
        // if (user && roles.find(role => user.roles.indexOf(role) !== -1))
        //     return true;
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        const result = jwt.verify(token, Secret_1.Secret.Key);
        return result ? true : false;
    }),
    validation: true,
    defaultErrorHandler: false,
    middlewares: [ErrorHandle_1.ErrorHandle],
    controllers: [AuthRest_1.AuthRest, AccountRest_1.AccountRest, ProductRest_1.ProductRest, CategoryRest_1.CategoryRest, TableRest_1.TableRest, BillRest_1.BillRest, BillInfoRest_1.BillInfoRest]
});
app.use(morgan_1.default("dev"));
app.listen(port, () => {
    console.log(`Application run on port ${port}`);
});
