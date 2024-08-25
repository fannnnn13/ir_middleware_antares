import Users from "../models/userModel.js";
import bcrypt from "bcrypt";

export const Login = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                username: req.body.username,
            },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Wrong password" });
        }

        // Check if a session already exists
        if (req.session.userId) {
            return res.status(200).json({ message: "User already logged in." });
        }

        // Store user details in session if no existing session
        req.session.userId = user.uuid;

        // Save session data
        req.session.save((err) => {
            if (err) {
                return res.status(500).json({ message: "Session save failed" });
            }
            res.status(200).json({
                uuid: user.uuid,
                full_name: user.full_name,
                username: user.username,
            });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const Me = async (req, res) => {
    if (!req.session.userId) {
        return res
            .status(401)
            .json({ message: "Please Login to your account!" });
    }
    const user = await Users.findOne({
        attributes: ["uuid", "full_name", "username"],
        where: {
            uuid: req.session.userId,
        },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
};

export const Logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(400).json({ message: "Can't Logout" });
        }
        res.clearCookie("connect.sid");
        res.status(200).json({ message: "Logout successfully" });
    });
};
