import { Request, Response, NextFunction } from "express";
import Deploy from "../models/Deploy";
import Condition from "../models/base/Condition";

// @desc   Get a Model
// @route  GET /api/v1/doors/:id
export const getDeploy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const condition = new Condition({ where: { id: req.params.id } });
  const model = new Deploy(req.body);
  await model.read(condition);
  return res.status(200).send(model.response);
};

// @desc   Get all Models
// @route  GET /api/v1/deploys
export const getDeploys = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const model = new Deploy(undefined);
  await model.read();
  return res.status(200).send(model.response);
};

// @desc   Create a Model
// @route  POST /api/v1/deploys
export const createDeploy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Deploy received :", req.body);
  const model = new Deploy(req.body);
  (await model.validate()) && (await model.create());
  return res.status(201).send(model.response);
};

// @desc   Update a Model
// @route  UPDATE /api/v1/deploys
export const updateDeploy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const condition = new Condition({ where: { id: req.params.id } });
  const model = new Deploy(req.body);
  (await model.validate()) && (await model.update(condition));
  return res.status(200).send(model.response);
};

// @desc   Delete Model
// @route  DELETE /api/v1/deploys
export const deleteDeploy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Deleting record from deploys with id ", req.params.id);
  const model = new Deploy(req.body);
  const condition = new Condition({ where: { id: req.params.id } });
  await model.delete(condition);
  return res.status(200).send(model.response);
};
