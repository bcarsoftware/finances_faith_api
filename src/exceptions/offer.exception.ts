import { CoreException, ExceptionType } from "./core/core.exception.ts";

export class OfferException extends CoreException {
    constructor(props: ExceptionType) {
        props.name = "OfferException";
        super(props);
    }
}
