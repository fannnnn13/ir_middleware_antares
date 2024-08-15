import express from "express";
import {
    getRemotes,
    getRemoteById,
    createRemote,
    updateRemote,
    deleteRemote,
    searchRemotes,
} from "../controllers/remoteController.js";
// import { verifyUser } from "../middleware/authUser.js";

const router = express.Router();

router.get("/remotes", getRemotes);
router.get("/remotes/:id", getRemoteById);
router.post("/remotes", createRemote);
router.patch("/remotes/:id", updateRemote);
router.delete("/remotes/:id", deleteRemote);
router.get("/remotesearch", searchRemotes);

export default router;
