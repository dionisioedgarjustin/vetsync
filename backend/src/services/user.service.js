import { userModel } from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const registerUser = async (data) => {
  const password_hash = await bcrypt.hash(data.password, 10);
  return await userModel({ ...data, password_hash });
};