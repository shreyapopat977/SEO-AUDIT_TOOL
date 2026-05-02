import app from "./src/app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});


console.log(process.env.MONGO_URI);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});