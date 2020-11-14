import axios from "axios";
import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
} from "graphql";

// API Url
const API_URL = "https://api.eliteprospects.com/v1";
const API_KEY = "apiKey=DR4bckuLj2g8BQnm5du5EkEd2w8QXCvX";
const apiUrl = (endPoint: string) => `${API_URL}/${endPoint}?${API_KEY}`;

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
          const url = await axios
            .get(apiUrl(`teams/${id}`))
            .then((res: any) => res.data.data.logoUrl);
          return url;
        },
        country_name: parent.team.country.name,
        flag_url: async () => {
          const link = parent.team.country._links[0];
          const url = await axios
            .get(link)
            .then((res: any) => res.data.data.flagUrl.medium);
          return url;
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
      resolve: () =>
        axios.get(apiUrl("game-logs")).then((res: any) => {
          console.log(res.data.data);
          return res.data.data;
        }),
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
