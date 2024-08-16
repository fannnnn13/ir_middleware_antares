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
router.get("/remotes/:uuid", getRemoteById);
router.post("/remotes", createRemote);
router.patch("/remotes/:uuid", updateRemote);
router.delete("/remotes/:uuid", deleteRemote);
router.get("/remotesearch", searchRemotes);

export default router;
