import Mongo from "./base/Mongo";
import bcrypt from "bcrypt";
import { ConditionI } from "../interfaces";

type UserT = {
  _id?: string;
  name?: string;
  email: string;
  password?: string;
  address?: string;
};

const COLLECTION = "users";

class User extends Mongo {
  constructor(private user?: UserT) {
    super(COLLECTION, user);
  }

  rules() {
    return {
      name: "required",
      email: "required|email",
      password: "required",
    };
  }

  async create(): Promise<any> {
    const hashedPassword = await bcrypt.hash(this.data.password, 10);
    this.data.password = hashedPassword;
    await super.create();
    return this;
  }

  async update(condition: ConditionI) {
    const hashedPassword = await bcrypt.hash(this.data.password, 10);
    this.data.password = hashedPassword;
    await super.update(condition);
    return this;
  }
}

export default User;
