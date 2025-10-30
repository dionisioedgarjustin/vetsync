import express from "express";
import {
  createPet,
  getMyPets,
  getPetById,
  deletePet,
} from "../controllers/petController.js";
import { verifyToken, verifyOwner } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, verifyOwner, createPet);
router.get("/", verifyToken, verifyOwner, getMyPets);
router.get("/:pet_id", verifyToken, verifyOwner, getPetById);
router.delete("/:pet_id", verifyToken, verifyOwner, deletePet);

export default router;
