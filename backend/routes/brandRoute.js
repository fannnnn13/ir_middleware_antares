import express from "express";
import {
    getBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand,
    searchBrands,
} from "../controllers/brandController.js";
import { verifyUser } from "../middleware/authUser.js";

const router = express.Router();

router.get("/brands", verifyUser, getBrands);
router.get("/brands/:id", verifyUser, getBrandById);
router.post("/brands", verifyUser, createBrand);
router.patch("/brands/:id", verifyUser, updateBrand);
router.delete("/brands/:id", verifyUser, deleteBrand);
router.get("/searchbrands", verifyUser, searchBrands);

export default router;
