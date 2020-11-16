import axios from "axios";
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
} from "graphql";
import Condition from "./base/Condition";
import Country from "./Country";
import Team from "./Team";
import moment from "moment";
import GameLog from "./GameLog";
import { ModuleResolutionKind } from "typescript";

// API Url
const API_URL = "https://api.eliteprospects.com/v1";
const API_KEY = "apiKey=DR4bckuLj2g8BQnm5du5EkEd2w8QXCvX";
const apiUrl = (endPoint: string) => `${API_URL}/${endPoint}?${API_KEY}`;

// Get Flag URL
const getFlagUrl = async (country_name: string, link: string) => {
  const model = new Country({ name: country_name, flag_url: "" });
  const condition = new Condition({ where: { name: country_name } });
  await model.read(condition);
  if (model.response.success === true) {
    console.log("Found :", country_name);
    return model.response.data[0].flag_url;
  }

  const url = await axios.get(link).then(async (res: any) => {
    const flag_url = res.data?.data?.flagUrl?.medium;
    const model = new Country({ name: country_name, flag_url });
    (await model.validate()) && (await model.create());
    console.log("Did not find ", model.response);
    return flag_url;
  });
  return url;
};

// Get Team Logo URL
const getTeamLogoUrl = async (team_id: number, name: string) => {
  const model = new Team({ team_id, name, logo_url: "" });
  const condition = new Condition({ where: { team_id } });
  await model.read(condition);
  if (model.response.success === true) {
    console.log("Found team:", team_id);
    return model.response.data[0].logo_url;
  }

  const url = await axios
    .get(apiUrl(`teams/${team_id}`))
    .then(async (res: any) => {
      const logo_url = res.data.data.logoUrl;
      const model = new Team({ team_id, name, logo_url });
      (await model.validate()) && (await model.create());
      console.log("Did not find ", model.response);
      return logo_url;
    });
  return url;
};

// Get GameLog
const getGameLog = async () => {
  const date = moment(new Date()).format("YYYY-MM-DD");
  const model = new GameLog(undefined);
  const condition = new Condition({ where: { date } });
  await model.read(condition);
  if (model.response.success === true) {
    console.log("GameLog exists for date", date, model.response.data[0]);
    return model.response.data[0];
  }

  await axios.get(apiUrl("game-logs")).then(async (res: any) => {
    console.log("Made req");
    const data = res.data.data;
    const gameLog = data.map(async (d: any) => {
      const game = {
        game_id: d.game.id,
        date: d.game.date,
        date_time: d.game.date_time,
        season: {
          slug: d.game.season.slug,
          startYear: d.game.season.startYear,
          endYear: d.game.season.endYear,
          type: d.game.seasonType,
        },
        league: {
          slug: d.game.league.slug,
          name: d.game.league.name,
          class: d.game.league.teamClass,
        },
        team: {
          id: d.team.id,
          name: d.team.name,
          country: d.team.country.name,
          class: d.team.teamClass,
          type: d.team.teamType,
        },
        stats: {
          TOI: d.stats.TOI,
          SOG: d.stats.SOG,
          G: d.stats.G,
          A: d.stats.A,
          PTS: d.stats.PTS,
          PIM: d.stats.PIM,
          PM: d.stats.PM,
          PPG: d.stats.PPG,
          SHG: d.stats.SHG,
        },
      };
      const model = new GameLog(game);
      (await model.validate()) && (await model.create());
      console.log("Game ", game);
      return game;
    });
    return gameLog;
  });
};

// TeamType
const TeamType = new GraphQLObjectType({
  name: "Team",
  description: "A Single Team",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    logo_url: { type: GraphQLString },
    country_name: { type: GraphQLString },
    flag_url: { type: GraphQLString },
  },
});

// StatType
const StatType = new GraphQLObjectType({
  name: "Stat",
  description: "Single Stat",
  fields: {
    TOI: { type: GraphQLString },
    A: { type: GraphQLInt },
    PTS: { type: GraphQLInt },
    PIM: { type: GraphQLInt },
    PM: { type: GraphQLInt },
  },
});

// GameType
const GameType = new GraphQLObjectType({
  name: "Game",
  description: "Single Game",
  fields: {
    id: { type: GraphQLInt },
    date: { type: GraphQLString },
  },
});

// LogType
const LogType = new GraphQLObjectType({
  name: "Log",
  description: "Single Log",
  fields: {
    game: { type: GameType },
    stat: {
      type: StatType,
      resolve: (parent, args) => ({
        TOI: parent.stats.TOI,
        A: parent.stats.A,
        PTS: parent.stats.PTS,
        PIM: parent.stats.PIM,
        PM: parent.stats.PM,
      }),
    },
    team: {
      type: TeamType,
      resolve: (parent, args) => ({
        id: parent.team.id,
        name: parent.team.name,
        logo_url: async () => {
          const id = parent.team.id;
          const name = parent.team.name;
          return await getTeamLogoUrl(id, name);
        },
        country_name: parent.team.country.name,
        flag_url: async () => {
          const link = parent.team.country._links[0];
          const country_name = parent.team.country.name;
          return await getFlagUrl(country_name, link);
        },
      }),
    },
  },
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    logs: {
      type: new GraphQLList(LogType),
      resolve: async () => {
        console.log("GetGame Log");
        return await getGameLog();
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
