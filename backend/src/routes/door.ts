import express from "express";
import {
  getDoor,
  getDoors,
  createDoor,
  updateDoor,
  deleteDoor,
} from "../controllers/door";
import { authenticate_user } from "../middlewares/authenticate_user";
import { same_user_id } from "../middlewares/same_user_id";
import { ws_update } from "../middlewares/ws_update";

const router = express.Router();

router
  .route("/:id")
  .get([authenticate_user, same_user_id], getDoor)
  .delete(ws_update, deleteDoor) // should admin delete
  .put(ws_update, updateDoor);

router.route("/").get(getDoors).post(ws_update, createDoor);

export default router;
