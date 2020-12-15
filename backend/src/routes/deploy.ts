import express from "express";
import {
  createDeploy,
  getDeploys,
  getDeploy,
  deleteDeploy,
  updateDeploy,
} from "../controllers/deploy";
import { authenticate_user } from "../middlewares/authenticate_user";
import { same_user_id } from "../middlewares/same_user_id";
import { ws_update } from "../middlewares/ws_update";

const router = express.Router();

router.route("/").get(getDeploys).post(createDeploy);

router
  .route("/:id")
  .get([authenticate_user, same_user_id], getDeploy)
  .delete(ws_update, deleteDeploy) // should admin delete
  .put(ws_update, updateDeploy);
export default router;
