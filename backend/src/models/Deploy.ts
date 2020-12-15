import Mongo from "./base/Mongo";
import { Database } from "./base/Database";
import { ConditionI } from "../interfaces";

type DeployT = {
  _id?: string;
  id: number;
  email: string;
  name: string;
  type: string;
  github_url: string;
  shell: string;
};

const COLLECTION = "deploys";

class Deploy extends Mongo {
  constructor(private logo?: DeployT) {
    super(COLLECTION, logo);
  }

  rules() {
    return {
      id: "required",
      email: "required",
      name: "required",
      type: "required",
      github_url: "required",
    };
  }

  async update(condition: ConditionI) {
    // Check if deploy or update
    if (this.data["action"] && this.data["action"] === "start_deploy") {
      console.log("Starting deploy");
      this.setResponse(true, { msg: "deploy started" });
      return this;
    }
    return super.update(condition);
  }
}

export default Deploy;
