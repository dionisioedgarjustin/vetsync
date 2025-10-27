import * as UserService from "../services/user.service.js";
import pool from "../config/db.js";

export const createUser = async (req, res, next) => {
  const allowedUserTypes = [
    "pet_owner",
    "clinic_admin",
    "vet_professional",
    "system_admin",
  ];

  const {
    email,
    password,
    full_name,
    user_type,
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

    const user = await UserService.registerUser(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res) => {
    return
} 
