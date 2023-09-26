import { Response, Request, NextFunction } from "express";

import { HttpError } from "../helpers/HttpError";

const validateEmptyBody = (req: Request, res: Response, next: NextFunction) => {
    if (Object.keys(req.body).length === 0) {
        return next(new HttpError(400, "missing fields"));
    }
    next();
};

export default validateEmptyBody;
