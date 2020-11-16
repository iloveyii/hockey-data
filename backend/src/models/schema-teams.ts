import axios from "axios";
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLScalarType,
} from "graphql";
import Condition from "./base/Condition";
import Team from "./Team";
import moment from "moment";
import Logo from "./Logo";
import { roundTimestamp } from "../utils";

const FRESHNESS_TIME_SECONDS = 1 * 10; // 5 min

// API Url
const API_URL = "https://api.eliteprospects.com/v1";
const API_KEY = "apiKey=DR4bckuLj2g8BQnm5du5EkEd2w8QXCvX";
const apiUrl = (endPoint: string) => `${API_URL}/${endPoint}?${API_KEY}`;

// Get Team Logo URL
const getLogoUrl = async (id: number, name: string, type: string) => {
  const model = new Logo({ id, name, type });
  const condition = new Condition({ where: { id, type } });

  await model.read(condition);

  if (model.response.success === true) {
    return model.response.data[0].url;
  }

  // If type is team-logo
  console.log(apiUrl(`teams/${id}`));
  const url = await axios.get(apiUrl(`teams/${id}`)).then(async (res: any) => {
    const url = res.data.data.logoUrl;
    const model = new Logo({ id, name, type, url });
    if (await model.validate()) {
      await model.create();
    } else {
      console.log("Cannot validate ", model.response, res.data);
    }
    console.log("Did not find logo with id ", id, type, condition.where);
    return url;
  });
  return url;
};

// Get TeamLog
const getTeamLog = async () => {
  const timestamp = roundTimestamp(FRESHNESS_TIME_SECONDS);

  const model = new Team(undefined);
  const condition = new Condition({ where: { timestamp } });
  await model.read(condition, { position: -1 });
  if (model.response.success === true) {
    console.log(
      "TeamLog exists for timestamp",
      timestamp,
      model.response.data.slice(0, 1)
    );
    return model.response.data;
  } else {
    console.log(
      "TeamLog does not exist for timestamp ",
      timestamp,
      condition.where
    );
  }

  return await axios.get(apiUrl("team-stats")).then(async (res: any) => {
    console.log("Made req");
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
            position: position ? position : 0,
            stat: { GP, W, L, T, OTW, OTL, PTS, GF, GA, GD },
            timestamp,
          };
          resolve(team);
        });
      });
    });

    // Let all the promises complete
    const teams = await Promise.all(requests);
    console.log("teams :: ", teams.slice(0, 1));
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
      } else {
        console.log("Cannot validate : ", model.response.data[0]);
      }
    });

    return teams;
  });
};

const resolveInFiveSeconds = (teamLog: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("REsolved, ", teamLog.slice(0, 2));
      return resolve(teamLog);
    }, 5000);
  });
};

// StatType
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

// TeamType
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

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    logs: {
      type: new GraphQLList(TeamType),
      resolve: async () => {
        console.log("GetTeam Log");
        return await getTeamLog();
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
