import express from "express";
import {
  createPet,
  getMyPets,
  getPetById,
  deletePet,
  updatePet
} from "../controllers/petController.js";
import { verifyToken, verifyOwner } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, verifyOwner, createPet);

router.get("/", verifyToken, verifyOwner, getMyPets);
router.get("/:pet_id", verifyToken, verifyOwner, getPetById);

router.patch("/:pet_id", verifyToken, verifyOwner, updatePet);

router.delete("/:pet_id", verifyToken, verifyOwner, deletePet);


export default router;
