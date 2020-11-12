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
const API_URL =
  "https://api.eliteprospects.com/v1/game-logs?apiKey=DR4bckuLj2g8BQnm5du5EkEd2w8QXCvX";

// DataType

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
  },
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    logs: {
      type: new GraphQLList(LogType),
      resolve: () =>
        axios.get(API_URL).then((res: any) => {
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
