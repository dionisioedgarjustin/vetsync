import express from 'express';
import { register, createVetProfessional } from '../controllers/userController.js';
import { verifyToken, verifyClinicAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// users Creation Routes
router.post('/register', register); // for petOwner or clinicAdmin
router.post('/vet', verifyToken, verifyClinicAdmin, createVetProfessional); // only clinic admin

export default router;