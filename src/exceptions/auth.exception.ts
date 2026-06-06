import { CoreException } from "./core/core.exception.ts";

type StatusCode = 400 | 401 | 403 | 498 | 500;

const messages = {
    400: "auth payload bad request",
    401: "unauthorized user",
    403: "forbidden user",
    498: "invalid credentials",
    500: "internal server error",
};

const causes = {
    400: "payload has invalid or missing data",
    401: "authentication is required, the token was not found",
    403: "access denied, you do not have the necessary credentials",
    498: "authentication has failed, the token has expired or invalid",
    500: "internal server error",
};

export class AuthException extends CoreException {
    constructor(code: StatusCode) {
        super({
            code: code,
            cause: causes[code],
            message: messages[code],
            name: "AuthException",
            stack: "process.authorization.exception",
        });
    }
}
