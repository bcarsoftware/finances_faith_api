import { CoreException, ExceptionType } from "./core/core.exception.ts";

export class InvoiceLogException extends CoreException {
    constructor(props: ExceptionType) {
        props.name = "InvoiceLogException";
        super(props);
    }
}
