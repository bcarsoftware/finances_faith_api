import { CoreException, ExceptionType } from "./core/core.exception.ts";

export class CashHubException extends CoreException {
    constructor(props: ExceptionType) {
        props.name = "CashHubException";
        super(props);
    }
}
