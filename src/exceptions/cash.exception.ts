import { CoreException, ExceptionType } from "./core/core.exception.ts";

export class CashException extends CoreException {
    constructor(props: ExceptionType) {
        props.name = "CashException";
        super(props);
    }
}
