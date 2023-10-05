// import { HttpError } from "routing-controllers";
// import type { ValidationError } from "class-validator";

// interface MessageInterface {
//     status: number;
//     message?: string;
//     code?: string;
//     errors?: ValidationError[];
// }
// export class ApiError extends HttpError {
//     status: number;
//     protected error: MessageInterface;
//     public removeLog: boolean;

//     constructor(status = 500, error: Omit<MessageInterface, "status">) {
//         super(status);

//         this.status = status;

//         this.error = { ...error, status, code: error.code || "INTERNAL_ERROR" };

//         this.name = "ApiError";

//         this.message = error.message || "";
//     }

//     public toJSON = (): MessageInterface => {
//         return this.error;
//     };
// }

export class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, "Unauthorized");
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
}
