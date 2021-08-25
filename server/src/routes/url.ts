import { Router } from "express";
import { validate } from "express-validation";
import { UrlService } from "../services/url.service";
import { UrlController } from "../controllers/url.controller";
import { idParamValidation } from "../controllers/validations/id-param.validation";
import { addUrlValidation } from "../controllers/validations/add-url.validation";
import { UrlModel } from "../db/models/url.model";

const urlController = new UrlController(new UrlService(UrlModel));
const urlRouter = Router();

/**
 * Registering app routes and their controllers
 */
urlRouter.get("/", urlController.get);
urlRouter.post("/", validate(addUrlValidation), urlController.add);
urlRouter.delete("/:id", validate(idParamValidation), urlController.deleteById);

export { urlRouter };
