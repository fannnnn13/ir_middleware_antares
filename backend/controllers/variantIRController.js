import VariantIR from "../models/variantIRModel.js";
import Brands from "../models/brandModel.js";

export const getVariants = async (req, res) => {
    try {
        const response = await VariantIR.findAll({
            include: [
                {
                    model: Brands,
                    attributes: ["uuid", "brand_name"],
                },
            ],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getVariantById = async (req, res) => {
    try {
        const response = await VariantIR.findOne({
            where: {
                uuid: req.params.id,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createVariant = async (req, res) => {
    try {
        await VariantIR.create(req.body);
        res.status(201).json({ message: "Variant created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateVariant = async (req, res) => {
    try {
        const variant = await VariantIR.findOne({
            where: {
                uuid: req.params.id,
            },
        });

        if (!variant)
            return res.status(404).json({ message: "Variant not found" });

        await VariantIR.update(req.body, {
            where: {
                uuid: req.params.id,
            },
        });
        res.status(200).json({ message: "Variant updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteVariant = async (req, res) => {
    try {
        await VariantIR.destroy({
            where: {
                uuid: req.params.id,
            },
        });
        res.status(200).json({ message: "Variant deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
