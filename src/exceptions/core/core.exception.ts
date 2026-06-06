export type ExceptionType = {
    code?: number;
    cause?: string;
    message?: string;
    name?: string;
    stack?: string;
};

export abstract class CoreException extends Error {
    private _code: number;

    protected constructor(props: ExceptionType) {
        super(props.message || "Exception Context: Message");
        this._code = props.code || 500;
        this.cause = props.cause || undefined;
        this.name = props.name || "Exception Context";
        this.stack = props.stack || undefined;
    }

    get code(): number {
        return this._code;
    }

    set code(code: number) {
        this._code = code;
    }
}
