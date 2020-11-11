import { Request, Response, NextFunction } from "express";
import { Database } from "../models/base/Database";
import Condition from "../models/base/Condition";
import Permission from "../models/Permission";


// @desc   Get all from Model
// @route  GET /api/v1/permissions
export const getPermissions = async (req: Request, res: Response, next: NextFunction) => {
    const model = new Permission(undefined);
    await model.read();
    return res.status(200).send(model.response);
};

// @desc   Get a Model
// @route  GET /api/v1/permissions/:id
export const getPermission = async (req: Request, res: Response, next: NextFunction) => {
    const condition = new Condition({where: {id: req.params.id}});
    const model = new Permission( req.body);
    await model.read(condition);
    return res.status(200).send(model.response);
};

// @desc   Register/Create a Model - using bcrypt hashed passwords
// @route  POST /api/v1/register
export const createPermission = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Permission received :", req.body.Permission);
    const model = new Permission( req.body);
    await model.validate() && await model.create();
    return res.status(201).send(model.response);
};

// @desc   Update a Model
// @route  UPDATE /api/v1/permission
export const updatePermission = async (req: Request, res: Response, next: NextFunction) => {
    const condition = new Condition({where: {id: req.params.id}});
    const model = new Permission( req.body);
    await model.validate() && await model.update(condition);
    return res.status(200).send(model.response);
};

// @desc   Delete Model
// @route  DELETE /api/v1/permission
export const deletePermission = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Deleting record from Permissions with id ", req.params.id);
    const model = new Permission( req.body);
    const condition = new Condition({where: {id: req.params.id}});
    await model.delete(condition);
    return res.status(200).send(model.response);
};
