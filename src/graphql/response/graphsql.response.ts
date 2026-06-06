export interface SuccessResponse<T = any> {
    message: string;
    data?: T;
    errors: null;
    extensions: {
        code: 200 | 201;
        success: boolean;
    };
}

export class GraphQLResponse {
    static create<T>(
        data: T,
        message: string = "operation successfully.",
        code: 200 | 201,
    ): SuccessResponse<T> {
        return {
            message,
            data,
            errors: null,
            extensions: {
                code: code,
                success: true,
            },
        };
    }
}
