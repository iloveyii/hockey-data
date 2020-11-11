import express from "express";
import {
  getSensorData,
  getSensorDataStats,
  getSensorDatas,
  createSensorData,
  updateSensorData,
  deleteSensorData,
} from "../controllers/sensor_data";
import { authenticate_user } from "../middlewares/authenticate_user";
import { same_user_id } from "../middlewares/same_user_id";
import { ws_update } from "../middlewares/ws_update";

const router = express.Router();

router
  .route("/:id")
  .get(getSensorData)
  .delete(ws_update, deleteSensorData) // should admin delete
  .put(ws_update, updateSensorData);

router.route("/:id/stats").get(getSensorDataStats);
router.route("/").get(getSensorDatas).post(ws_update, createSensorData);

export default router;
