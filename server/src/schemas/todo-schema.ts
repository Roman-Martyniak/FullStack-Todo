import Joi, { ObjectSchema } from "joi";

type AddSchemaType = ObjectSchema<{
    todo: string;
}>;

export const addSchema: AddSchemaType = Joi.object({
    todo: Joi.string().required(),
});
