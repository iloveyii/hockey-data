import ActiveRecord from "./base/ActiveRecord";

class SensorData extends ActiveRecord {
  constructor(name) {
    super(name);
    this._form = {
      user_id: "",
      data: "",
      timestamp: "",
    };
  }

  rules() {
    return {
      user_id: "required",
    };
  }

  messages(type) {
    switch (type) {
      case this.types.create_success:
        return [{ type: "success", msg: "Created sensor data successfully" }];
      case this.types.read_success:
        return [{ type: "info", msg: "Read all sensor data successfully" }];
      case this.types.update_success:
        return [{ type: "warning", msg: "Updated sensor data successfully" }];
      case this.types.delete_success:
        return [{ type: "error", msg: "Deleted sensor data successfully" }];
      default:
        return [{ type: "success", msg: "Sensor data success" }];
    }
  }
}

export default SensorData;
