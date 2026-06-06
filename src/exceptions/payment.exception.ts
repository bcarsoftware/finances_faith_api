import { CoreException, ExceptionType } from "./core/core.exception.ts";

export class PaymentException extends CoreException {
    constructor(props: ExceptionType) {
        props.name = "PaymentException";
        super(props);
    }
}
