import { ErrorRequestHandler } from "express";
import { ValidationError } from "express-validation";

export const errorRequestHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  // eslint-disable-next-line
  next
) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }
  console.error("Server error occurred:", err);
  return res.status(500).json({ message: "A server error occurred!" });
};
