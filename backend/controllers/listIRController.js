import ListIR from "../models/listIRModel.js";
import Brands from "../models/brandModel.js";
import VariantIR from "../models/variantIRModel.js";
import Remote from "../models/remoteModel.js";

export const getIRList = async (req, res) => {
    try {
        const response = await ListIR.findAll({
            include: [
                {
                    model: Brands,
                    attributes: ["uuid", "brand_name"],
                },
                {
                    model: VariantIR,
                    attributes: [
                        "uuid",
                        "variant_name",
                        "raw_data1",
                        "raw_data2",
                    ],
                },
                {
                    model: Remote,
                    attributes: ["uuid", "device_name", "serial_number"],
                },
            ],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getIRListByDeviceId = async (req, res) => {
    try {
        // Cari data IR List yang berhubungan dengan Remote berdasarkan uuid dari model Remote
        const response = await ListIR.findAll({
            include: [
                {
                    model: Brands,
                    attributes: ["uuid", "brand_name"],
                },
                {
                    model: VariantIR,
                    attributes: [
                        "uuid",
                        "variant_name",
                        "raw_data1",
                        "raw_data2",
                    ],
                },
                {
                    model: Remote,
                    where: {
                        uuid: req.params.uuid,
                    },
                    attributes: ["uuid", "device_name", "serial_number"],
                },
            ],
        });

        // Jika data ditemukan, kembalikan dengan status 200
        if (response.length > 0) {
            res.status(200).json(response);
        } else {
            res.status(404).json({
                message: "No IR List found for this device",
            });
        }
    } catch (error) {
        // Jika terjadi error, kembalikan error message dengan status 500
        res.status(500).json({ message: error.message });
    }
};

export const addIRList = async (req, res) => {
    try {
        const { brand_id, variant_id, device_id } = req.body;

        const existingIRList = await ListIR.findOne({
            where: {
                brand_id,
                variant_id,
                device_id,
            },
        });

        if (existingIRList) {
            return res.status(409).json({ message: "IR List already exists" });
        }

        await ListIR.create(req.body);
        res.status(201).json({ message: "IR List created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteIRList = async (req, res) => {
    try {
        await ListIR.destroy({
            where: {
                uuid: req.params.uuid,
            },
        });
        res.status(200).json({ message: "IR List deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
