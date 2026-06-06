import { CoreException, ExceptionType } from "./core/core.exception.ts";

export class FaithException extends CoreException {
    constructor(props: ExceptionType) {
        props.name = "FaithException";
        super(props);
    }
}
