import * as jwt from "jsonwebtoken";
import { AuthException } from "../../exceptions/auth.exception.ts";
import { Regex } from "../../utils/regex/regex.ts";

type TimeTypes = "1m" | "1d" | "2m" | "2d" | "7m" | "7d";

interface TokenPayload {
    userId: string;
}

interface Time {
    expiresIn: TimeTypes;
}

const timeValidate = (time: string): TimeTypes => {
    const regex = new RegExp(/^[127][md]$/);

    if (!regex.test(time)) return "2m";

    return <TimeTypes>time;
};

const getJWTSecret = async (): Promise<string> => {
    const jwtSecret: string | undefined = process.env.JWT_SECRET;

    if (!jwtSecret) throw new AuthException(500);

    return jwtSecret;
};

/**
 * Generating a Json Web Token.
 * @param payload
 * It's an object contained two keys: userId and profile.
 * * userId: uuid format as 77eaf026-d6f0-4350-98a5-a95a101e94ef;
 */
export const generateToken = async (payload: TokenPayload): Promise<string> => {
    if (!Regex.uuid(payload.userId)) throw new AuthException(400);

    const secret = await getJWTSecret();

    const time = process.env.JWT_EXPIRES_IN ?? "";

    const expiresIn: Time = { expiresIn: timeValidate(time) };

    return jwt.sign(payload, secret, expiresIn);
};

/**
 * This async function checks if the token is considering valid.
 * @param token a json web token format string.
 */
export const verifyToken = async (token?: string) => {
    if (!token) throw new AuthException(401);

    const secret = await getJWTSecret();

    try {
        const decoded = jwt.verify(token, secret);

        return decoded as TokenPayload;
    } catch (error) {
        console.error(error);

        throw new AuthException(498);
    }
};
