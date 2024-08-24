import express from "express";
import {
    getRemotes,
    getRemoteById,
    createRemote,
    updateRemote,
    deleteRemote,
    searchRemotes,
} from "../controllers/remoteController.js";
import { verifyUser } from "../middleware/authUser.js";

const router = express.Router();

router.get("/remotes", verifyUser, getRemotes);
router.get("/remotes/:uuid", verifyUser, getRemoteById);
router.post("/remotes", verifyUser, createRemote);
router.patch("/remotes/:uuid", verifyUser, updateRemote);
router.delete("/remotes/:uuid", verifyUser, deleteRemote);
router.get("/remotesearch", verifyUser, searchRemotes);

export default router;
