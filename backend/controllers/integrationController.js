import { Op } from "sequelize";
import Integration from "../models/integrationModel.js";
import Remote from "../models/remoteModel.js";

export const getIntegrations = async (req, res) => {
    try {
        const response = await Integration.findAll({
            include: [
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

export const getIntegrationById = async (req, res) => {
    try {
        const response = await Integration.findOne({
            where: {
                uuid: req.params.id,
            },
            include: [
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

export const createIntegration = async (req, res) => {
    try {
        const { integration_name, device_id } = req.body;

        const existingIntegrationName = await Integration.findOne({
            where: { integration_name },
        });

        if (existingIntegrationName) {
            return res
                .status(409)
                .json({ message: "Integration name already exists" });
        }

        const existingIntegrationDevice = await Integration.findOne({
            where: { device_id },
        });

        if (existingIntegrationDevice) {
            return res
                .status(409)
                .json({ message: "Device already registered" });
        }

        await Integration.create(req.body);
        res.status(201).json({ message: "Integration created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateIntegration = async (req, res) => {
    // try {
    //     const integration = await Integration.findOne({
    //         where: {
    //             uuid: req.params.uuid,
    //         },
    //     });

    //     if (!integration)
    //         return res.status(404).json({ message: "Integration not found" });

    //     await Integration.update(req.body, {
    //         where: {
    //             uuid: req.params.uuid,
    //         },
    //     });
    //     res.status(200).json({ message: "Integration updated successfully" });
    // } catch (error) {
    //     res.status(500).json({ message: error.message });
    // }
    try {
        const { uuid } = req.params;
        const { integration_name, device_id } = req.body;

        const existingIntegrationName = await Integration.findOne({
            where: {
                integration_name,
                uuid: { [Op.ne]: uuid },
            },
        });

        const existingDevice = await Integration.findOne({
            where: {
                device_id,
                uuid: { [Op.ne]: uuid },
            },
        });

        if (existingIntegrationName) {
            return res
                .status(400)
                .json({ message: "Integration name already exists" });
        }

        if (existingDevice) {
            return res
                .status(400)
                .json({ message: "Device already registered" });
        }

        await Integration.update(req.body, {
            where: {
                uuid,
            },
        });

        res.status(200).json({ message: "Integration updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteIntegration = async (req, res) => {
    try {
        await Integration.destroy({
            where: {
                uuid: req.params.uuid,
            },
        });
        res.status(200).json({ message: "Integration deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchIntegrations = async (req, res) => {
    const search = req.query.search_query;
    const result = await Integration.findOne({
        where: {
            [Op.or]: [
                {
                    integration_name: {
                        [Op.like]: `%${search}%`,
                    },
                },
            ],
        },
    });
    res.json(result);
};
