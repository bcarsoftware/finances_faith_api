import { CoreException, ExceptionType } from "./core/core.exception.ts";

export class InvoiceException extends CoreException {
    constructor(props: ExceptionType) {
        props.name = "InvoiceException";
        super(props);
    }
}
