import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

export const getUsers = async (req, res) => {
    try {
        const response = await Users.findAll({
            attributes: ["uuid", "full_name", "username"],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes: ["uuid", "full_name", "username"],
            where: {
                uuid: req.params.uuid,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    const { full_name, username, password, conf_password } = req.body;

    if (password !== conf_password) {
        return res.status(400).json({ message: "Password does not match" });
    }

    try {
        const existingUser = await Users.findOne({
            where: {
                username: username,
            },
        });

        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        await Users.create({
            full_name: full_name,
            username: username,
            password: hashPassword,
        });
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { uuid } = req.params;
        const { full_name, username, password, conf_password } = req.body;

        // Temukan pengguna berdasarkan UUID
        const user = await Users.findOne({
            where: {
                uuid,
            },
        });

        if (!user) return res.status(404).json({ message: "User not found" });

        // Memeriksa apakah username baru sudah ada
        if (username && username !== user.username) {
            const existingUser = await Users.findOne({
                where: {
                    username,
                },
            });

            if (existingUser) {
                return res
                    .status(400)
                    .json({ message: "Username already exists" });
            }
        }

        let hashPassword = user.password;

        // Update password hanya jika password dan konfirmasi password disediakan
        if (password || conf_password) {
            if (password && conf_password) {
                if (password !== conf_password) {
                    return res
                        .status(400)
                        .json({ message: "Password does not match" });
                }

                // Memastikan password baru berbeda dari password lama
                const isSamePassword = await bcrypt.compare(
                    password,
                    user.password
                );
                if (isSamePassword) {
                    return res.status(400).json({
                        message:
                            "New password must be different from the old password",
                    });
                }

                try {
                    const salt = await bcrypt.genSalt(10);
                    hashPassword = await bcrypt.hash(password, salt);
                } catch (error) {
                    return res
                        .status(500)
                        .json({ message: "Error hashing password" });
                }
            } else if (password || conf_password) {
                return res.status(400).json({
                    message:
                        "Both password and confirmation password must be provided",
                });
            }
        }

        // Update data pengguna
        await Users.update(
            {
                full_name: full_name || user.full_name,
                username: username || user.username,
                password: hashPassword, // Hanya update password jika diinput
            },
            {
                where: {
                    uuid,
                },
            }
        );

        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.uuid,
        },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    try {
        await Users.destroy({
            where: {
                id: user.id,
            },
        });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
