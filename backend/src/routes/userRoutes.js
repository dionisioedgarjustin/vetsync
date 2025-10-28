import express from 'express';
import { register, createVetProfessional } from '../controllers/userController.js';
// should add verifyAdmin middleware auth JWT

const router = express.Router();

router.post('/register', register); // for petOwner or clinicAdmin
router.post('/vet', createVetProfessional); // only clinic admin

export default router;