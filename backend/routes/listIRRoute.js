import express from "express";
import {
    getIRList,
    getIRListByDeviceId,
    addIRList,
    deleteIRList,
} from "../controllers/listIRController.js";
import { verifyUser } from "../middleware/authUser.js";

const router = express.Router();

router.get("/irlist", verifyUser, getIRList);
router.get("/irlist/:uuid", verifyUser, getIRListByDeviceId);
router.post("/irlist", verifyUser, addIRList);
router.delete("/irlist/:uuid", verifyUser, deleteIRList);

export default router;
