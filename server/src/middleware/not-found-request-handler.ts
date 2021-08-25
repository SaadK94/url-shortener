import { RequestHandler } from "express";

export const notFoundRequestHandler: RequestHandler = (req, res) => {
  return res.status(404).json({ message: "Not found" });
};
