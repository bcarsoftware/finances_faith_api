import * as crypto from "crypto";
import * as bcrypt from "bcrypt";
import { PasswordException } from "../../exceptions/password.exception.ts";
import { RegexUtil } from "../regex/regex.util.ts";

function hashedPassword(password: string): string {
    return crypto.createHash("sha256").update(password).digest("hex");
}

export async function encryptPassword(password: string): Promise<string> {
    const passwordSha256 = hashedPassword(password);

    const salts = process.env.SALTS;

    if (!salts || !RegexUtil.numeric(salts)) {
        throw new PasswordException({
            code: 400,
            message: "invalid salt for password",
            cause: "password salt is a invalid value or not found",
            stack: "password.util.encryptPassword",
        });
    }

    return await bcrypt.hash(passwordSha256, salts);
}

export async function comparePasswords(
    password: string,
    hashed: string,
): Promise<boolean> {
    const passwordSha256 = hashedPassword(password);

    return await bcrypt.compare(passwordSha256, hashed);
}
