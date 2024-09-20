import express from "express";
import cors from "cors";
import billRoutes from "./routes/billRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import peopleRoutes from "./routes/peopleRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

app.use("/bills", billRoutes);
app.use("/items", itemRoutes);
app.use("/people", peopleRoutes);
app.use("/transactions", transactionRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});