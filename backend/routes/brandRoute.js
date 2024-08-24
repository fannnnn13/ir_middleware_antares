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
router.get("/brands/:uuid", verifyUser, getBrandById);
router.post("/brands", verifyUser, createBrand);
router.patch("/brands/:uuid", verifyUser, updateBrand);
router.delete("/brands/:uuid", verifyUser, deleteBrand);
router.get("/searchbrands", verifyUser, searchBrands);

export default router;
