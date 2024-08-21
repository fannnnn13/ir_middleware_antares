import express from "express";
import {
    getIntegrations,
    getIntegrationById,
    createIntegration,
    updateIntegration,
    deleteIntegration,
    searchIntegrations,
} from "../controllers/integrationController.js";
// import { verifyUser } from "../middleware/authUser.js";

const router = express.Router();

router.get("/integrations", getIntegrations);
router.get("/integrations/:uuid", getIntegrationById);
router.post("/integrations", createIntegration);
router.patch("/integrations/:uuid", updateIntegration);
router.delete("/integrations/:uuid", deleteIntegration);
router.get("/searchintegrations", searchIntegrations);

export default router;
