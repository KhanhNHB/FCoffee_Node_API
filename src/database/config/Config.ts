export class Config {
    host: string;
    user: string;
    password: string;
    database: string;

    constructor(database: string, host: string, user: string, password: string) {
        this.database = database;
        this.host = host;
        this.user = user;
        this.password = password;
    }
}
