import { Op } from "sequelize";
import Brands from "../models/brandModel.js";

export const getBrands = async (req, res) => {
    try {
        const response = await Brands.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBrandById = async (req, res) => {
    try {
        const response = await Brands.findOne({
            where: {
                uuid: req.params.uuid,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createBrand = async (req, res) => {
    try {
        // Check if a brand with the same name already exists
        const existingBrand = await Brands.findOne({
            where: { brand_name: req.body.brand_name },
        });

        if (existingBrand) {
            // If a brand with the same name exists, return a 409 Conflict response
            return res.status(409).json({ message: "Brand already exists" });
        }

        // If no duplicate, create the new brand
        await Brands.create(req.body);
        res.status(201).json({ message: "Brand created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBrand = async (req, res) => {
    // try {
    //     const brand = await Brands.findOne({
    //         where: {
    //             uuid: req.params.uuid,
    //         },
    //     });

    //     if (!brand) return res.status(404).json({ message: "Brand not found" });

    //     await Brands.update(req.body, {
    //         where: {
    //             uuid: req.params.uuid,
    //         },
    //     });
    //     res.status(200).json({ message: "Brand updated successfully" });
    // } catch (error) {
    //     res.status(500).json({ message: error.message });
    // }
    try {
        const { uuid } = req.params;
        const { brand_name } = req.body;

        const existingBrand = await Brands.findOne({
            where: {
                brand_name,
                uuid: { [Op.ne]: uuid },
            },
        });

        if (existingBrand) {
            return res.status(400).json({ message: "Brand already exists" });
        }

        await Brands.update(req.body, {
            where: {
                uuid,
            },
        });

        res.status(200).json({ message: "Brand updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteBrand = async (req, res) => {
    try {
        await Brands.destroy({
            where: {
                uuid: req.params.uuid,
            },
        });
        res.status(200).json({ message: "Brand deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchBrands = async (req, res) => {
    const search = req.query.search_query;
    const result = await Brands.findOne({
        where: {
            [Op.or]: [
                {
                    brand_name: {
                        [Op.like]: `%${search}%`,
                    },
                },
            ],
        },
    });
    res.json(result);
};
