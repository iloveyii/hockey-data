// ----------------------------------
// Imoort packages
// ----------------------------------
import axios from "axios";
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} from "graphql";
import dotenv from "dotenv";

import Condition from "./base/Condition";
import Team from "./Team";
import Logo from "./Logo";
import { roundTimestamp } from "../utils";

// ----------------------------------
// Environment setup - API Url
// ----------------------------------
dotenv.config({ path: ".env" });
const {
  ELITE_API_URL = "https://api.eliteprospects.com/v1",
  ELITE_API_KEY = "apiKey=DR4bckuLj2g8BQnm5du5EkEd2w8QXCvX",
  FRESHNESS_TIME_SECONDS = 1 * 60, // 1 min * 60 sec - API data fetch rate
} = process.env;
const apiUrl = (endPoint: string) =>
  `${ELITE_API_URL}/${endPoint}?${ELITE_API_KEY}`;

// ----------------------------------
// Get Logo url for Team from DB/API
// ----------------------------------
const getLogoUrl = async (id: number, name: string, type: string) => {
  // Check DB first
  const model = new Logo({ id, name, type });
  const condition = new Condition({ where: { id, type } });
  await model.read(condition);

  if (model.response.success === true) {
    // If data found in db
    return model.response.data[0].url;
  }

  // If type is team-logo (more country-flat etc)
  const url = await axios.get(apiUrl(`teams/${id}`)).then(async (res: any) => {
    const url = res.data.data.logoUrl;
    const model = new Logo({ id, name, type, url });
    (await model.validate()) && (await model.create());
    return url;
  });
  return url;
};

// ----------------------------------
// Get TeamLog from DB/API
// ----------------------------------
const getTeamLog = async () => {
  // timestamp to save with db record
  const timestamp = roundTimestamp(Number(FRESHNESS_TIME_SECONDS));
  // Check DB first
  const model = new Team(undefined);
  const condition = new Condition({ where: { timestamp } });
  await model.read(condition, { position: -1 });
  if (model.response.success === true) {
    // If data found in db
    return model.response.data?.slice(0, 20);
  }

  // Finally make API call
  return await axios.get(apiUrl("team-stats")).then(async (res: any) => {
    const data = res.data.data;
    const requests = data.map((d: any) => {
      return new Promise((resolve: any, reject: any) => {
        getLogoUrl(d.team.id, d.team.name, "team-logo").then((url: string) => {
          const { id, position } = d;
          const { id: team_id, name } = d.team;
          const { GP, W, L, T, OTW, OTL, PTS, GF, GA, GD } = d.stats;
          const team = {
            id,
            team_id,
            name,
            url,
            position: Number(position),
            stat: { GP, W, L, T, OTW, OTL, PTS, GF, GA, GD },
            timestamp,
          };
          resolve(team);
        });
      });
    });

    // Let all the promises complete
    const teams = await Promise.all(requests);
    // Sort on position
    teams.sort((a: any, b: any) =>
      Number(a.position) > Number(b.position) ? -1 : 1
    );
    // Save to DB
    teams.map(async (team: any) => {
      const model = new Team(team);
      if (await model.validate()) {
        const condition = new Condition({ where: { id: team.id, timestamp } });
        await model.createIfNotExist(condition);
      }
    });

    return teams.slice(0, 20);
  });
};

// ----------------------------------
// Get StatType
// ----------------------------------
const StatType = new GraphQLObjectType({
  name: "Stat",
  description: "A single Stat",
  fields: {
    GP: { type: GraphQLInt },
    W: { type: GraphQLInt },
    L: { type: GraphQLInt },
    T: { type: GraphQLInt },
    OTW: { type: GraphQLInt },
    OTL: { type: GraphQLInt },
    PTS: { type: GraphQLInt },
    GF: { type: GraphQLInt },
    GA: { type: GraphQLInt },
    GD: { type: GraphQLInt },
  },
});

// ----------------------------------
// Get TeamType
// ----------------------------------
const TeamType = new GraphQLObjectType({
  name: "Team",
  description: "A single Team",
  fields: {
    id: { type: GraphQLInt },
    team_id: { type: GraphQLInt },
    name: { type: GraphQLString },
    url: { type: GraphQLString },
    position: { type: GraphQLInt },
    stat: { type: StatType },
    timestamp: { type: GraphQLString },
  },
});

// ----------------------------------
// Root Query
// ----------------------------------
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    logs: {
      type: new GraphQLList(TeamType),
      resolve: async () => await getTeamLog(),
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
