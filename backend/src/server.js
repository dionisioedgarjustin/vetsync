import express from "express";
import cors from "cors";
import { syncDB } from "./models/users/index.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from './routes/authRoutes.js';
import petRoutes from "./routes/petRoutes.js";


const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

//user Routes
app.use("/api/users", userRoutes);

//auth Routes
app.use('/api/auth', authRoutes);

//pet Routes
app.use("/api/pets", petRoutes);

syncDB().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
