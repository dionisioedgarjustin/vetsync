import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/users/userModel.js';

dotenv.config();

// Verify if token exists and is valid
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    req.user = user; // attach user info to request
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Verify if user is a PetOwner
export const verifyOwner = (req, res, next) => {
  if (req.user.user_type !== 'pet_owner') {
    return res.status(403).json({ error: 'Access denied — PetOwner only' });
  }
  next();
};


// Verify if user is a ClinicAdmin
export const verifyClinicAdmin = (req, res, next) => {
  if (req.user.user_type !== 'clinic_admin') {
    return res.status(403).json({ error: 'Access denied — ClinicAdmin only' });
  }
  next();
};
