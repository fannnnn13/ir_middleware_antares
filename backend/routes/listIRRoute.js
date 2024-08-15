import express from "express";
import {
    getIRList,
    getIRListByDeviceId,
    addIRList,
    deleteIRList,
} from "../controllers/listIRController.js";
// import { verifyUser } from "../middleware/authUser.js";

const router = express.Router();

router.get("/irlist", getIRList);
router.get("/irlist/:id", getIRListByDeviceId);
router.post("/irlist", addIRList);
router.delete("/irlist/:id", deleteIRList);

export default router;
