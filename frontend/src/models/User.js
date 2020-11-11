import ActiveRecord from "./base/ActiveRecord";

class User extends ActiveRecord {
  constructor(name) {
    super(name);
    this._form = {
      name: "",
      email: "",
      password: "",
      address: "",
    };
  }

  rules() {
    return {
      email: "required|email",
      name: "required",
    };
  }

  messages(type) {
    switch (type) {
      case this.types.create_success:
        return [{ type: "success", msg: "Created user successfully" }];
      case this.types.read_success:
        return [{ type: "info", msg: "Read all users successfully" }];
      case this.types.update_success:
        return [{ type: "warning", msg: "Updated user successfully" }];
      case this.types.delete_success:
        return [{ type: "error", msg: "Deleted user successfully" }];
      default:
        return [{ type: "success", msg: "User success" }];
    }
  }
}

export default User;
