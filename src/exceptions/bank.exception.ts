import { CoreException, ExceptionType } from "./core/core.exception.ts";

export class BankException extends CoreException {
    constructor(props: ExceptionType) {
        props.name = "BankException";
        super(props);
    }
}
