import { CoreException, ExceptionType } from "./core/core.exception.ts";

export class UserException extends CoreException {
    constructor(props: ExceptionType) {
        props.name = "UserException";
        super(props);
    }
}
