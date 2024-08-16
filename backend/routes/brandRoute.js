import express from "express";
import {
    getBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand,
    searchBrands,
} from "../controllers/brandController.js";
// import { verifyUser } from "../middleware/authUser.js";

const router = express.Router();

router.get("/brands", getBrands);
router.get("/brands/:uuid", getBrandById);
router.post("/brands", createBrand);
router.patch("/brands/:uuid", updateBrand);
router.delete("/brands/:uuid", deleteBrand);
router.get("/searchbrands", searchBrands);

export default router;
