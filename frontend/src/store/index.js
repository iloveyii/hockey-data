import Login from "../models/Login";
import User from "../models/User";
import Door from "../models/Door";
import Permission from "../models/Permission";
import Gatekeeper from "../models/Gatekeeper";
import SensorData from "../models/SensorData";
import GameLog from "../models/GameLog";

const models = {
  logins: new Login("logins"),
  users: new User("users"),
  doors: new Door("doors"),
  permissions: new Permission("permissions"),
  gatekeepers: new Gatekeeper("gatekeepers"),
  sensor_datas: new SensorData("sensor_datas"),
  game_logs: new GameLog("game_logs"),
};

export default models;
