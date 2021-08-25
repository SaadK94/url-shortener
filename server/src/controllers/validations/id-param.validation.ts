import { Joi } from "express-validation";

export const idParamValidation = {
  params: Joi.object({
    id: Joi.string()
      .regex(/^[a-f\d]{24}$/i)
      .required(),
  }),
};
