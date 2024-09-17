import express from "express";
import cors from "cors";
import billRoutes from "./routes/billRoutes.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());
app.use("/", billRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});