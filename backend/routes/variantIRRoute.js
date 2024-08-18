import express from "express";
import {
    getVariants,
    getVariantById,
    createVariant,
    updateVariant,
    deleteVariant,
} from "../controllers/variantIRController.js";
// import { verifyUser } from "../middleware/authUser.js";

const router = express.Router();

router.get("/variants", getVariants);
router.get("/variants/:uuid", getVariantById);
router.post("/variants", createVariant);
router.patch("/variants/:uuid", updateVariant);
router.delete("/variants/:uuid", deleteVariant);

export default router;
