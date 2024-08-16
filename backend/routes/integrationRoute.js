import express from "express";
import {
    getIntegrations,
    getIntegrationById,
    createIntegration,
    updateIntegration,
    deleteIntegration,
    searchIntegrations,
} from "../controllers/integrationController.js";
import { verifyUser } from "../middleware/authUser.js";

const router = express.Router();

router.get("/integrations", verifyUser, getIntegrations);
router.get("/integrations/:uuid", verifyUser, getIntegrationById);
router.post("/integrations", verifyUser, createIntegration);
router.patch("/integrations/:uuid", verifyUser, updateIntegration);
router.delete("/integrations/:uuid", verifyUser, deleteIntegration);
router.get("/searchintegrations", verifyUser, searchIntegrations);

export default router;
