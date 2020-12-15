import { Request, Response, NextFunction } from "express";
import { exec, spawn } from "child_process";

// @desc   Get a Model
// @route  GET /api/v1/deploys
export const getDeploys = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).send({
    success: true,
    msg: "You successfully accessed route - GET /api/v1/deploys",
  });
};

// @desc   Create a Model - using bcrypt hashed passwords
// @route  POST /api/v1/Deploys
export const createDeploy = async (
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
