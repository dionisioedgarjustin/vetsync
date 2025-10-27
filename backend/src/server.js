import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import pool from "./config/db.js";
import userRoutes from './routes/user.routes.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});