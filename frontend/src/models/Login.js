import ActiveRecord from "./base/ActiveRecord";
import axios from "axios";
import setAuthorizationHeader from "../helpers/setAuthorizationHeader";

class Login extends ActiveRecord {
  constructor(name) {
    super(name);
    this._form = {
      email: "",
      password: "",
    };
  }

  rules() {
    return {
      email: "required|email",
      password: "required",
    };
  }

  messages(type) {
    switch (type) {
      case this.types.create_success:
        return [{ type: "success", msg: "Login user successfully" }];
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

  newApiCreate = (payload) => {
    console.log("Inside api newApiCreate", payload);
    // Check if GET api/v1/logins OR api/v1/logins/1 is called
    let auth = {},
      headers = {};

    if (payload && payload.form && Object.keys(payload.form).length > 0) {
      console.log("Inside api newApiCreate if", JSON.stringify(payload));
      const { email, password } = payload.form;

      return axios
        .post(this.server, {
          email,
          password,
        })
        .then((res) => {
          if (res.data.success === true) {
            localStorage.setItem("__token", res.data.data[0].token);
            setAuthorizationHeader(res.data.data[0].token);
          } else {
            localStorage.setItem("__token", "");
          }
          return res.data;
        })
        .catch((error) => {
          console.dir(error);
          throw new Error(error);
        });
    } else {
      throw new Error("Email or password not defined in api");
    }
  };

  get api() {
    const newApi = super.api;
    newApi.create = this.newApiCreate;
    return newApi;
  }
}

export default Login;
