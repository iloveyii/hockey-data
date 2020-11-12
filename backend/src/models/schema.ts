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
    TOI: { type: GraphQLBoolean },
    A: { type: GraphQLInt },
    PTS: { type: GraphQLInt },
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
    stat: { type: StatType },
  },
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    logs: {
      type: new GraphQLList(LogType),
      resolve: () => axios.get(API_URL).then((res: any) => res.data.data),
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;