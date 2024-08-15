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
        await Integration.create(req.body);
        res.status(201).json({ message: "Integration created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateIntegration = async (req, res) => {
    try {
        const integration = await Integration.findOne({
            where: {
                uuid: req.params.id,
            },
        });

        if (!integration)
            return res.status(404).json({ message: "Integration not found" });

        await Integration.update(req.body, {
            where: {
                uuid: req.params.id,
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
                uuid: req.params.id,
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
