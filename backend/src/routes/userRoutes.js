import express from 'express';
import { register, createVetProfessional, updateUserDetails } from '../controllers/userController.js';
import { verifyToken, verifyClinicAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// users Creation Routes
router.post('/register', register); // for petOwner or clinicAdmin
router.post('/vet', verifyToken, verifyClinicAdmin, createVetProfessional); // only clinic admin

// users Update Routes
router.put('/update/:id', verifyToken, updateUserDetails); // any logged in user

export default router;