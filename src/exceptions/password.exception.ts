import { CoreException, ExceptionType } from "./core/core.exception.ts";

export class PasswordException extends CoreException {
    constructor(props: ExceptionType) {
        props.name = "PasswordException";
        super(props);
    }
}
