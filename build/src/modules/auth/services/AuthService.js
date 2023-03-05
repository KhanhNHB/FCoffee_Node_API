"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const routing_controllers_1 = require("routing-controllers");
const util_1 = require("util");
const Encode_1 = require("../../common/Encode");
const Secret_1 = require("../../common/Secret");
const AuthDao_1 = require("../daos/AuthDao");
const AuthToken_1 = require("./models/AuthToken");
class AuthService {
    constructor() {
        this.authDao = new AuthDao_1.AuthDao();
    }
    checkSignIn(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const daoAuth = yield this.authDao.checkSignIn(req);
            // check username
            if (util_1.isUndefined(daoAuth) || !daoAuth) {
                throw new routing_controllers_1.NotFoundError(`Username is incorrect!`);
            }
            // check password
            if (!(yield Encode_1.Encode.compare(req.password, daoAuth.password))) {
                throw new routing_controllers_1.NotFoundError(`Password is incorrect!`);
            }
            const authToken = new AuthToken_1.AuthToken().toAuthToken(daoAuth);
            const token = jwt.sign({
                data: authToken
            }, Secret_1.Secret.Key, { expiresIn: "2 days" });
            authToken.username = req.username;
            authToken.access_token = token;
            authToken.expires_in = "2 days";
            return authToken;
        });
    }
}
exports.AuthService = AuthService;
