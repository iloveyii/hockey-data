import express from "express";
import { Request, Response, NextFunction } from "express";
import path from "path";

const getIndex = (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "../", "public", "index.html"));
};

const router = express.Router();
router.route("*").get(getIndex);

export default router;
