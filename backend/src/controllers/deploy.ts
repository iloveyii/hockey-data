import { Request, Response, NextFunction } from "express";
import { exec, spawn } from "child_process";
import Deploy from "../models/Deploy";

// @desc   Get a Model
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

// @desc   Create a Model
// @route  POST /api/v1/Deploys
export const createDeploy2 = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sp = spawn("sh", [
    "/home/ubuntu/projects/dev/mobile-platforms-dt581b-project/deploy/deploy.sh",
  ]);
  sp.stdout.on("data", (data: any) => console.log("DATA : ", data));
  sp.stderr.on("data", (data: any) => console.log("ERROR : ", data));
  sp.on("error", (error: any) => console.log("ERROR : ", error));
  sp.on("close", (code: any) =>
    console.log(`child process exited with code ${code}`)
  );

  return res.status(200).send({
    success: true,
    msg: "You successfully accessed route - POST /api/v1/deploys",
  });
};
