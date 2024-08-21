import { Op } from "sequelize";
import VariantIR from "../models/variantIRModel.js";
import Brands from "../models/brandModel.js";

// export const getVariants = async (req, res) => {
//     try {
//         const response = await VariantIR.findAll({
//             include: [
//                 {
//                     model: Brands,
//                     attributes: ["uuid", "brand_name"],
//                 },
//             ],
//         });
//         res.status(200).json(response);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

export const getVariants = async (req, res) => {
    try {
        const { brand_id } = req.query;

        let queryOptions = {
            include: [
                {
                    model: Brands,
                    attributes: ["uuid", "brand_name"],
                },
            ],
        };

        // If brand_id is provided, add a where clause to filter by brand_id
        if (brand_id) {
            queryOptions.where = { brand_id };
        }

        const response = await VariantIR.findAll(queryOptions);

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getVariantById = async (req, res) => {
    try {
        const response = await VariantIR.findAll({
            include: [
                {
                    model: Brands,
                    where: {
                        uuid: req.params.uuid,
                    },
                    attributes: ["uuid", "brand_name"],
                },
            ],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createVariant = async (req, res) => {
    try {
        const { brand_id, variant_name } = req.body;

        const existingVariant = await VariantIR.findOne({
            where: {
                brand_id,
                variant_name,
            },
        });

        if (existingVariant) {
            return res
                .status(409)
                .json({ message: "Variant already exists for this brand" });
        }

        await VariantIR.create(req.body);
        res.status(201).json({ message: "Variant created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateVariant = async (req, res) => {
    // try {
    //     const variant = await VariantIR.findOne({
    //         where: {
    //             uuid: req.params.uuid,
    //         },
    //     });

    //     if (!variant)
    //         return res.status(404).json({ message: "Variant not found" });

    //     await VariantIR.update(req.body, {
    //         where: {
    //             uuid: req.params.uuid,
    //         },
    //     });
    //     res.status(200).json({ message: "Variant updated successfully" });
    // } catch (error) {
    //     res.status(500).json({ message: error.message });
    // }
    try {
        const { uuid } = req.params;
        const { brand_id, variant_name } = req.body;

        const existingVariant = await VariantIR.findOne({
            where: {
                brand_id,
                variant_name,
                uuid: { [Op.ne]: uuid },
            },
        });

        if (existingVariant) {
            return res
                .status(400)
                .json({ message: "Variant already exists for this brand" });
        }

        await VariantIR.update(req.body, {
            where: {
                uuid,
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
                uuid: req.params.uuid,
            },
        });
        res.status(200).json({ message: "Variant deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
