import express from "express";
import { createDeploy, getDeploys } from "../controllers/deploy";

const router = express.Router();

router.route("/").get(getDeploys).post(createDeploy);

export default router;
