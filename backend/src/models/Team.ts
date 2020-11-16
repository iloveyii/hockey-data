import Mongo from "./base/Mongo";
import { Database } from "./base/Database";
import { ConditionI } from "../interfaces";

type StatsT = {
  GP: number;
  W: number;
  L: number;
  T: number | boolean;
  OTW: number;
  OTL: number;
  PTS: number;
  GF: number;
  GA: number;
  GD: number;
};

type TeamT = {
  _id?: string;
  team_id: number;
  name: string;
  logo_url: string;
  position?: number;
  stats?: StatsT;
};

const COLLECTION = "teams";

class Team extends Mongo {
  constructor(private team?: TeamT) {
    super(COLLECTION, team);
  }

  rules() {
    return {
      team_id: "required",
      name: "required",
      logo_url: "required",
    };
  }
}

export default Team;
