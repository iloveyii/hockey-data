import Mongo from "./base/Mongo";
import { Database } from "./base/Database";
import { ConditionI } from "../interfaces";

type DeviceLogT = {
  _id?: string;
  name?: string;
  building: string;
  room_number: string;
  device: string;
  command: string;
  timestamp: number;
};

const COLLECTION = "device_logs";

class DeviceLog extends Mongo {
  constructor(private deviceLog?: DeviceLogT) {
    super(COLLECTION, deviceLog);
  }

  rules() {
    return {
      building: "required",
      timestamp: "required",
    };
  }
}

export default DeviceLog;
