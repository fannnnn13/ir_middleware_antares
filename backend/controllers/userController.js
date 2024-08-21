import Users from "../models/userModel.js";
import bcrypt from "bcrypt";

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

    if (password !== conf_password)
        return res.status(400).json({ message: "Password does not match" });
    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    try {
        await Users.create({
            full_name: full_name,
            username: username,
            password: hashPassword,
        });
        res.json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                uuid: req.params.uuid,
            },
        });

        if (!user) return res.status(404).json({ message: "User not found" });

        const { full_name, username, password, conf_password } = req.body;

        let hashPassword = user.password;

        if (password) {
            if (password !== conf_password) {
                return res
                    .status(400)
                    .json({ message: "Password does not match" });
            }

            try {
                const salt = await bcrypt.genSalt(10);
                hashPassword = await bcrypt.hash(password, salt);
            } catch (error) {
                return res
                    .status(500)
                    .json({ message: "Error hashing password" });
            }
        }

        await Users.update(
            {
                full_name: full_name || user.full_name,
                username: username || user.username,
                password: hashPassword,
            },
            {
                where: {
                    id: user.id,
                },
            }
        );

        return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// export const updateUser = async (req, res) => {
//     const user = await Users.findOne({
//         where: {
//             uuid: req.params.uuid,
//         },
//     });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const { full_name, username, password, conf_password } = req.body;

//     let hashPassword;

//     if (password === "" || password === null) {
//         hashPassword = user.password;
//     } else {
//         hashPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
//     }
//     if (password !== conf_password)
//         return res.status(400).json({ message: "Password does not match" });
//     try {
//         await Users.update(
//             {
//                 full_name: full_name,
//                 username: username,
//                 password: hashPassword,
//             },
//             {
//                 where: {
//                     id: user.id,
//                 },
//             }
//         );
//         res.status(201).json({ message: "User updated successfully" });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

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
