import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;
import authRouter from "./routers/auth.router.js";
import cors from "cors";
app.use(
  cors({
    origin: ["http://localhost:5173", "127.0.0.1:5173",FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const initDatebase = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connection established successfully");
    if(NODE_ENV === "development"){
      await db.sequelize.sync({ alert: true });
      console.log("database synced in development mode");
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
initDatebase();

import db from "./models/index.js";
const role = db.Role;

db.sequelize.sync({ force: true }).then(() => {
initRole();
console.log("Drop and Sync");
});
const initRole = () => {
  role.create({ id: 1, name: "user" });
  role.create({ id: 2, name: "moderator" });
  role.create({ id: 3, name: "admin" });
};
app.get("/", (req, res) => {
  res.send("Restaurant Restful API Completed");
});

//use routers
app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
