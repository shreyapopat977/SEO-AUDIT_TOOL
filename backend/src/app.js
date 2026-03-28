import express from "express";
import cors from "cors";
import auditRoutes from "./routes/auditRoutes.js";
import connectDB from "./config/db.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/audit", auditRoutes);

export default app;