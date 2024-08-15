import User from "../models/userModel.js";

export const verifyUser = async (req, res, next) => {
    if (!req.session.userId) {
        return res
            .status(401)
            .json({ message: "Please Login to your account!" });
    }
    const user = await User.findOne({
        where: {
            uuid: req.session.userId,
        },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    req.userId = user.id;
    next();
};
