import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign(
    { id: user.id, user_type: user.user_type },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );

  return { user, token };
};
