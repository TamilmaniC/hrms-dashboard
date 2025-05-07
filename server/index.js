import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { sequelize } from "./config/db.js";
import { UserRouter } from "./routes/user.js";
import { EmployeeRouter } from "./routes/employee.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());
app.use("/auth", UserRouter);
app.use("/api/employees", EmployeeRouter);


sequelize.sync().then(() => {
  console.log("DB connected and synced ✅");
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("DB connection error:", err);
});
