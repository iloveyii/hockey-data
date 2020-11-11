import Mongo from "./base/Mongo";
import { Database } from "./base/Database";
import { ConditionI } from "../interfaces";
import { ObjectId } from "mongodb";

type SensorDataT = {
  _id?: string;
  user_id: string;
  data: any;
  timestamp?: any;
};

const COLLECTION = "sensor_data";

class SensorData extends Mongo {
  constructor(private SensorData?: SensorDataT) {
    super(COLLECTION, SensorData);
  }

  rules() {
    return {
      user_id: "required",
      data: "required",
      timestamp: "required",
    };
  }

  async createIfNotExist(condition: ConditionI): Promise<any> {
    await this.read(condition);
    if (!this.response.success) {
      await this.create();
    }
    return this;
  }
}

export default SensorData;
