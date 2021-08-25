import express from "express";
import cors from "cors";
import { notFoundRequestHandler } from "./middleware/not-found-request-handler";
import { errorRequestHandler } from "./middleware/error-request-handler";
import { router } from "./routes/router";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Registering base API routes
 */
app.use("/api", router);

/**
 * Not found and error request handlers
 */
app.use(notFoundRequestHandler);
app.use(errorRequestHandler);

export { app };
