import { Router } from "express";
import { urlRouter } from "./url";

const router = Router();

/**
 * Registering /product sub-routes
 */
router.use("/url", urlRouter);

export { router };
