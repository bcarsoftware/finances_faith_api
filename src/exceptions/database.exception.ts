import { CoreException } from "./core/core.exception.ts";

export class DatabaseException extends CoreException {
    constructor(stack: string) {
        super({
            name: "DatabaseException",
            code: 500,
            message: "database exception has occurred",
            cause: "something went wrong to your database connection or invalid input in operation",
            stack: stack,
        });
    }
}
