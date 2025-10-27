import pool from '../config/db.js';

export const userModel = async ({
  email,
  password_hash,
  full_name,
  user_type,
  phone_number,
  profile_image_url,
}) => {
  const insertQuery = `
    INSERT INTO users (
      email, password_hash, full_name, user_type, phone_number, profile_image_url
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING
      id, email, full_name, user_type, phone_number, profile_image_url, created_at;
  `;

  const values = [
    email,
    password_hash,
    full_name,
    user_type,
    phone_number,
    profile_image_url,
  ];

  const result = await pool.query(insertQuery, values);
  return result.rows[0]; // returns the inserted user
};