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
}

export default Deploy;
