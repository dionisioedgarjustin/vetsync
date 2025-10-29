import express from 'express';
import { register, createVetProfessional } from '../controllers/userController.js';
import { verifyToken, verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register); // for petOwner or clinicAdmin
router.post('/vet', verifyToken, verifyAdmin, createVetProfessional); // only clinic admin

export default router;