import express from "express";
import { getPermission, getPermissions, createPermission, updatePermission, deletePermission } from "../controllers/permission";
import { authenticate_user } from "../middlewares/authenticate_user";
import { same_user_id } from "../middlewares/same_user_id";
import { ws_update } from "../middlewares/ws_update";


const router = express.Router();

router.route("/:id")
    .get([authenticate_user, same_user_id], getPermission)
    .delete(ws_update, deletePermission) // should admin delete
    .put(ws_update, updatePermission);

router.route("/")
    .get(getPermissions)
    .post(ws_update, createPermission);


export default router;
