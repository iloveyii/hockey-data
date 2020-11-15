import express from "express";
import { loginUser, getUser } from "../controllers/login";

const router = express.Router();

router.route("/").post(loginUser);
router.route("*").get(getUser);

export default router;
