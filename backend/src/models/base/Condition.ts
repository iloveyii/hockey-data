import { ObjectId } from "mongodb";
import { ConditionT } from "../../types";
import { ConditionI } from "../../interfaces";

const dialect = process.env.CONTROLLER_DIALECT || "mongodb";

class Condition implements ConditionI {
  constructor(private readonly condition: ConditionT) {}

  get where(): ConditionT | any {
    return this.condition.where;
  }
}

export default Condition;
