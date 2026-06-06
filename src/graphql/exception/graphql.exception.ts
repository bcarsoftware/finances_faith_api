import { GraphQLError } from "graphql";
import { CoreException } from "../../exceptions/core/core.exception.ts";

export class GraphqlException extends GraphQLError {
    static async create(
        message: string,
        exception: CoreException,
    ): Promise<GraphQLError> {
        return new GraphQLError(message, {
            path: exception.path,
            originalError: exception,
            extensions: {
                success: false,
                code: exception.code,
                cause: exception.cause,
                name: exception.name,
                stack: exception.stack,
            },
        });
    }
}
