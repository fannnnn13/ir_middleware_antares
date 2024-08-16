import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/userController.js";
import { verifyUser } from "../middleware/authUser.js";

const router = express.Router();

router.get("/users", verifyUser, getUsers);
router.get("/users/:uuid", verifyUser, getUserById);
router.post("/users", createUser);
router.patch("/users/:uuid", verifyUser, updateUser);
router.delete("/users/:uuid", verifyUser, deleteUser);

export default router;
