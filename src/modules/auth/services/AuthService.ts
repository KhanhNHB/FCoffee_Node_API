import * as jwt from "jsonwebtoken";
import { NotFoundError } from "routing-controllers";
import { isUndefined } from "util";
import { Encode } from "../../common/Encode";
import { Secret } from "../../common/Secret";
import { AuthDao } from "../daos/AuthDao";
import { AuthSignIn } from "./models/AuthSignIn";
import { AuthToken } from "./models/AuthToken";

export class AuthService {
    authDao: AuthDao;

    constructor() {
        this.authDao = new AuthDao();
    }

    async checkSignIn(req: AuthSignIn): Promise<AuthToken> {

        const daoAuth = await this.authDao.checkSignIn(req);

        // check username
        if (isUndefined(daoAuth) || !daoAuth) {
            throw new NotFoundError(`Username is incorrect!`);
        }

        // check password
        if (!(await Encode.compare(req.password, daoAuth.password))) {
            throw new NotFoundError(`Password is incorrect!`);
        }

        const authToken = new AuthToken().toAuthToken(daoAuth);

        const token = jwt.sign({
            data: authToken
        }, Secret.Key, { expiresIn: "2 days" });

        authToken.username = req.username;
        authToken.access_token = token;
        authToken.expires_in = "2 days"

        return authToken;
    }
}