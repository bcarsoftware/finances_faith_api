import { CoreException, ExceptionType } from "./core/core.exception.ts";

export class BankHubException extends CoreException {
    constructor(props: ExceptionType) {
        props.name = "BankHubException";
        super(props);
    }
}
