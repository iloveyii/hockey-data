import Mongo from "./base/Mongo";
import { Database } from "./base/Database";
import { ConditionI } from "../interfaces";

type DoorT = {
  _id?: string;
  name?: string;
  building: string;
  room_number: string;
};

const COLLECTION = "doors";

class Door extends Mongo {
  constructor(private door?: DoorT) {
    super(COLLECTION, door);
  }

  rules() {
    return {
      building: "required",
    };
  }

  async open(condition?: ConditionI) {
    await this.read(condition);

    if (this.response.success) {
      const model = this.response.data[0];
      // Opening gateway to open door with uri
      console.log("Door opened", model);
    }

    return this;
  }
}

export default Door;
