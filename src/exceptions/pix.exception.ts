import { CoreException, ExceptionType } from "./core/core.exception.ts";

export class PixException extends CoreException {
    constructor(props: ExceptionType) {
        props.name = "PixException";
        super(props);
    }
}
