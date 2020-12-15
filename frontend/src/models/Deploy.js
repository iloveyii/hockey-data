import ActiveRecord from "./base/ActiveRecord";

class Deploy extends ActiveRecord {
  constructor(name) {
    super(name);
    this._form = {
      id: "",
      email: "admin@y.com",
      name: "",
      type: "",
      github_url: "",
      shell: "",
    };
  }

  rules() {
    return {
      name: "required",
      type: "required",
      github_url: "required",
      shell: "required",
    };
  }

  messages(type) {
    switch (type) {
      case this.types.create_success:
        return [{ type: "success", msg: "Created deploy successfully" }];
      case this.types.read_success:
        return [{ type: "info", msg: "Read all deploys successfully" }];
      case this.types.update_success:
        return [{ type: "warning", msg: "Updated deploy successfully" }];
      case this.types.delete_success:
        return [{ type: "error", msg: "Deleted deploy successfully" }];
      default:
        return [{ type: "success", msg: "Deploy success" }];
    }
  }
}

export default Deploy;
