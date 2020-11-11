import express from "express";
import { getUser, getUsers, createUser, updateUser, deleteUser } from "../controllers/user";
import { authenticate_user } from "../middlewares/authenticate_user";
import { same_user_id } from "../middlewares/same_user_id";
import { ws_update } from "../middlewares/ws_update";


const router = express.Router();

router.route("/:id")
    .get([authenticate_user, same_user_id], getUser)
    .delete(ws_update, deleteUser) // should admin delete
    .put(ws_update, updateUser);

router.route("/")
    .get(getUsers)
    .post(ws_update, createUser);


export default router;
