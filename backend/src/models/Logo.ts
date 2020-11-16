import Mongo from "./base/Mongo";
import { Database } from "./base/Database";
import { ConditionI } from "../interfaces";

type LogoT = {
  _id?: string;
  id: number;
  name: string;
  type: string;
  url?: string;
};

const COLLECTION = "logos";

class Logo extends Mongo {
  constructor(private logo?: LogoT) {
    super(COLLECTION, logo);
  }

  rules() {
    return {
      id: "required",
      name: "required",
      type: "required",
    };
  }
}

export default Logo;
