import { Request, Response, NextFunction } from "express";
import { Database } from "../models/base/Database";
import Condition from "../models/base/Condition";
import Gatekeeper from "../models/Gatekeeper";

// @desc   UPDATE a Model
// @route  PUT /api/v1/Gatekeepers
export const updateGatekeeper = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Gatekeeper received :", req.body);
  const condition = new Condition({
    where: {
      building: req.body.building,
      room_number: req.body.room_number,
      status: "1", // enabled ?
    },
  });
  const model = new Gatekeeper(req.body);
  await model.update(condition);
  return res.status(200).send(model.response);
};

// @desc   Get a Model
// @route  GET /api/v1/gatekeeprs/:id
export const getGatekeeper = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Got command at controller on hw behald ", req.params);
  return res
    .status(200)
    .send({ success: true, data: [{ command: req.params.id }] });
};
