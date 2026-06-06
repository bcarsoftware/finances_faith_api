import { CoreException, ExceptionType } from "./core/core.exception.ts";

export class TitheException extends CoreException {
    constructor(props: ExceptionType) {
        props.name = "TitheException";
        super(props);
    }
}
