import { Joi } from "express-validation";

export const addUrlValidation = {
  body: Joi.object({
    url: Joi.string().required(),
  }),
};
