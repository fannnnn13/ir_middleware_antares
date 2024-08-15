import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import db from "./config/database.js";
import SequelizeStore from "connect-session-sequelize";
import userRoute from "./routes/userRoute.js";
import brandRoute from "./routes/brandRoute.js";
import integrationRoute from "./routes/integrationRoute.js";
import remoteRoute from "./routes/remoteRoute.js";
import listIRRoute from "./routes/listIRRoute.js";
import variantIRRoute from "./routes/variantIRRoute.js";
import authRoute from "./routes/authRoute.js";

dotenv.config();
const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db,
});

// (async () => {
//     await db.sync();
// })();

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: store,
        cookie: {
            secure: "auto",
        },
    })
);

app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
    })
);

app.use(express.json());

app.use(userRoute);
app.use(brandRoute);
app.use(integrationRoute);
app.use(remoteRoute);
app.use(listIRRoute);
app.use(variantIRRoute);
app.use(authRoute);

// store.sync();

app.listen(process.env.PORT, () => {
    console.log("Server up and running...");
});
