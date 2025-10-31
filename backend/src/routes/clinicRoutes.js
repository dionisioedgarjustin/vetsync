import express from "express";
import { registerNewClinic, updateClinicDetails } from "../controllers/clinicController.js";
import { verifyToken, verifyClinicAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// register new clinic - only clinic admins
router.post("/register", verifyToken, verifyClinicAdmin, registerNewClinic);

// update clinic details - only clinic admins
router.patch("/update/:clinicId", verifyToken, verifyClinicAdmin, updateClinicDetails)

export default router;