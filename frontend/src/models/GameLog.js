import ActiveRecord from "./base/ActiveRecord";

class GameLog extends ActiveRecord {
  constructor(name) {
    super(name);
    this._form = {};
    this.server = "http://localhost:7700/graphql?";
  }

  rules() {
    return {};
  }

  messages(type) {
    switch (type) {
      case this.types.create_success:
        return [{ type: "success", msg: "Created Game Log successfully" }];
      case this.types.read_success:
        return [{ type: "info", msg: "Read all Game Logs successfully" }];
      case this.types.update_success:
        return [{ type: "warning", msg: "Updated Game Log successfully" }];
      case this.types.delete_success:
        return [{ type: "error", msg: "Deleted Game Log successfully" }];
      default:
        return [{ type: "success", msg: "Success" }];
    }
  }
}

export default GameLog;
