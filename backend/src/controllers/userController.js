import { registerUser, registerVetProfessional } from '../services/userService.js';

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const createVetProfessional = async (req, res) => {
  try {
    const adminUserId = req.user.id; // from JWT or session
    const user = await registerVetProfessional(req.body, adminUserId);
    res.status(201).json({ message: 'Vet Professional created successfully', user });
  } catch (err) {
    console.error("Unable to create Vet Professional", err.message)
    res.status(400).json({ error: err.message });
  }
};