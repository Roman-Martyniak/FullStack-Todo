import { Request, Response, NextFunction } from "express";
import * as Joi from "joi";

import { HttpError } from "../helpers/HttpError";

type JoiSchema = Joi.ObjectSchema<any>;

export const validateBody = (schema: JoiSchema) => (req: Request, res: Response, next: NextFunction) => {
    console.log("I am here");

    const { error } = schema.validate(req.body);
    if (error) {
        const fieldName = error.details[0].path[0];
        throw new HttpError(400, `missing required ${fieldName} field`);
    }
    next();
};

export default validateBody;
