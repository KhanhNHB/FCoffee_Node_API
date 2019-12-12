import * as bcrypt from "bcryptjs";

export class Encode {
    static async hash(password: string) {
        return await bcrypt.hash(password, 11);
    }

    static async compare(current: string, original: string): Promise<Boolean> {
        return await bcrypt.compare(current, original);
    }
}