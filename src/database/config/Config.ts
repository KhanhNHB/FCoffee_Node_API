export class Config {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;

    constructor(database: string, host: string, port: number, user: string, password: string) {
        this.database = database;
        this.host = host;
        this.port = port;
        this.user = user;
        this.password = password;
    }
}
