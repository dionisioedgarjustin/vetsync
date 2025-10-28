import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import { syncDB } from "./models/users/index.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

syncDB().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
