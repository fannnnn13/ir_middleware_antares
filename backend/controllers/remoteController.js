import { Op } from "sequelize";
import Remote from "../models/remoteModel.js";

export const getRemotes = async (req, res) => {
    try {
        const response = await Remote.findAll({
            attributes: ["id", "uuid", "device_name", "serial_number"],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRemoteById = async (req, res) => {
    try {
        const response = await Remote.findOne({
            where: {
                uuid: req.params.uuid,
            },
            attributes: ["id", "uuid", "device_name", "serial_number"],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// export const createRemote = async (req, res) => {
//     try {
//         const existingRemote = await Remote.findOne({
//             where: {
//                 device_name: req.body.device_name,
//                 serial_number: req.body.serial_number,
//             },
//         });

//         if (existingRemote) {
//             return res.status(409).json({ message: "Remote already exists" });
//         }

//         await Remote.create(req.body);
//         res.status(201).json({ message: "Remote created successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

export const createRemote = async (req, res) => {
    try {
        const { device_name, serial_number } = req.body;

        const existingDeviceName = await Remote.findOne({
            where: { device_name },
        });

        if (existingDeviceName) {
            return res
                .status(409)
                .json({ message: "Device name already exists" });
        }

        const existingSerialNumber = await Remote.findOne({
            where: { serial_number },
        });

        if (existingSerialNumber) {
            return res
                .status(409)
                .json({ message: "Serial number already exists" });
        }

        await Remote.create(req.body);
        res.status(201).json({ message: "Remote created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRemote = async (req, res) => {
    // try {
    //     const remote = await Remote.findOne({
    //         where: {
    //             uuid: req.params.uuid,
    //         },
    //     });

    //     if (!remote)
    //         return res.status(404).json({ message: "Remote not found" });

    //     await Remote.update(req.body, {
    //         where: {
    //             uuid: req.params.uuid,
    //         },
    //     });
    //     res.status(200).json({ message: "Remote updated successfully" });
    // } catch (error) {
    //     res.status(500).json({ message: error.message });
    // }
    try {
        const { uuid } = req.params;
        const { device_name, serial_number } = req.body;

        const existingDeviceName = await Remote.findOne({
            where: {
                device_name,
                uuid: { [Op.ne]: uuid },
            },
        });

        const existingSerialNumber = await Remote.findOne({
            where: {
                serial_number,
                uuid: { [Op.ne]: uuid },
            },
        });

        if (existingDeviceName) {
            return res
                .status(400)
                .json({ message: "Device name already exists" });
        }

        if (existingSerialNumber) {
            return res
                .status(400)
                .json({ message: "Serial number already exists" });
        }

        await Remote.update(req.body, {
            where: {
                uuid,
            },
        });

        res.status(200).json({ message: "Remote updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteRemote = async (req, res) => {
    try {
        await Remote.destroy({
            where: {
                uuid: req.params.uuid,
            },
        });
        res.status(200).json({ message: "Remote deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchRemotes = async (req, res) => {
    const search = req.query.search_query;
    const result = await Remote.findOne({
        where: {
            [Op.or]: [
                {
                    device_name: {
                        [Op.like]: `%${search}%`,
                    },
                    serial_number: {
                        [Op.like]: `%${search}%`,
                    },
                },
            ],
        },
    });
    res.json(result);
};
