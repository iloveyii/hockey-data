import Mongo from "./base/Mongo";
import { Database } from "./base/Database";
import { ConditionI } from "../interfaces";

type CountryT = {
  _id?: string;
  name?: string;
  flag_url: string;
};

const COLLECTION = "countries";

class Country extends Mongo {
  constructor(private country?: CountryT) {
    super(COLLECTION, country);
  }

  rules() {
    return {
      name: "required",
      flag_url: "required",
    };
  }
}

export default Country;
