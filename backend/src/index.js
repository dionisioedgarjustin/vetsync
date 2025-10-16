import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import pool from "./db.js";

const app = express();
const port = process.env.PORT || 4000;
const allowedUserTypes = [
  "pet_owner",
  "clinic_admin",
  "vet_professional",
  "system_admin",
];

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/users/register", async (req, res) => {
  const {
    email,
    password,
    full_name,
    user_type,
    phone_number,
    profile_image_url,
  } = req.body;

  if (!email || !password || !full_name || !user_type) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (!allowedUserTypes.includes(user_type)) {
    return res.status(400).json({ message: "Invalid user_type" });
  }

  try {
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const insertQuery = `
      INSERT INTO users (
        email,
        password_hash,
        full_name,
        user_type,
        phone_number,
        profile_image_url
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING 
        id,
        email,
        full_name,
        user_type,
        phone_number,
        profile_image_url,
        created_at
    `;

    const values = [
      email,
      passwordHash,
      full_name,
      user_type,
      phone_number || null,
      profile_image_url || null,
    ];

    const result = await pool.query(insertQuery, values);

    return res.status(201).json({ user: result.rows[0] });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});