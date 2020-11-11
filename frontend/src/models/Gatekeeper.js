import ActiveRecord from "./base/ActiveRecord";

class Gatekeeper extends ActiveRecord {
  constructor(name) {
    super(name);
    this._form = {
      building: "",
      room_number: "",
      status: "",
      command: "",
    };
  }

  rules() {
    return {
      building: "required",
      room_number: "required",
      status: "required",
      command: "required",
    };
  }

  messages(type) {
    switch (type) {
      case this.types.create_success:
        return [{ type: "success", msg: "Created gatekeeper successfully" }];
      case this.types.read_success:
        return [{ type: "info", msg: "Read all gatekeepers successfully" }];
      case this.types.update_success:
        return [{ type: "warning", msg: "Updated gatekeeper successfully" }];
      case this.types.delete_success:
        return [{ type: "error", msg: "Deleted gatekeeper successfully" }];
      default:
        return [{ type: "success", msg: "Gatekeeper success" }];
    }
  }
}

export default Gatekeeper;
