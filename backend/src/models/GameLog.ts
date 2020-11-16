import Mongo from "./base/Mongo";
import { Database } from "./base/Database";
import { ConditionI } from "../interfaces";
import Team from "./Team";

type SeasonT = {
  slug: string;
  startYear: number;
  endYear: number;
  type: string;
};

type LeagueT = {
  slug: string;
  name: number;
  class: number;
};

type TeamT = {
  id: number;
  name: string;
  country: string;
  class: string;
  type: string;
};

type StatsT = {
  TOI: string;
  SOG: number;
  G: number;
  A: number;
  PTS: number;
  PIM: number;
  PM: number;
  PPG: number;
  SHG: number;
};

type GameLogT = {
  _id?: string;
  game_id: number;
  date?: string;
  date_time?: string;
  season: SeasonT;
  league: LeagueT;
  team: TeamT;
  stats: StatsT;
};

const COLLECTION = "game_logs";

class GameLog extends Mongo {
  constructor(private gameLog?: GameLogT) {
    super(COLLECTION, gameLog);
  }

  rules() {
    return {
      game_id: "required",
      season: "required",
      league: "required",
      team: "required",
    };
  }
}

export default GameLog;
