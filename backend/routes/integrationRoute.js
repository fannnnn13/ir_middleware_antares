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
router.get("/integrations/:id", verifyUser, getIntegrationById);
router.post("/integrations", verifyUser, createIntegration);
router.patch("/integrations/:id", verifyUser, updateIntegration);
router.delete("/integrations/:id", verifyUser, deleteIntegration);
router.get("/searchintegrations", verifyUser, searchIntegrations);

export default router;
