import express from "express";
import {
    getVariants,
    getVariantById,
    createVariant,
    updateVariant,
    deleteVariant,
} from "../controllers/variantIRController.js";
import { verifyUser } from "../middleware/authUser.js";

const router = express.Router();

router.get("/variants", verifyUser, getVariants);
router.get("/variants/:uuid", verifyUser, getVariantById);
router.post("/variants", verifyUser, createVariant);
router.patch("/variants/:uuid", verifyUser, updateVariant);
router.delete("/variants/:uuid", verifyUser, deleteVariant);

export default router;
