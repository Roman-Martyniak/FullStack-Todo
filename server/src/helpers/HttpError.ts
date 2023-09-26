interface IError {
    statusCode: number;
    message: string;
}

class HttpError implements IError {
    statusCode: number;
    message: string;

    constructor(statusCode: number, message: string) {
        this.statusCode = statusCode;
        this.message = message;
    }
}

export { HttpError };
