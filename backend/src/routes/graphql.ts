import express from "express";
import { Request, Response, NextFunction } from "express";
import schema from "../models/schema";
import path from "path";

import { graphqlHTTP } from "express-graphql";

const getIndex = (req: Request, res: Response, next: NextFunction) => {
  console.log("Inside getIndex");
  return graphqlHTTP({
    schema,
    graphiql: true,
  });
};

const router = express.Router();
router.route("/").get(
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

export default router;
