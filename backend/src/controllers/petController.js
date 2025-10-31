import {
  createPetService,
  getMyPetsService,
  getPetByIdService,
  deletePetService,
  updatePetService,
} from "../services/petService.js";

export const createPet = async (req, res) => {
  try {
    const owner_id = req.user.id; // from JWT
    const petData = req.body;

    const newPet = await createPetService(owner_id, petData);
    res.status(201).json({ message: "Pet created successfully", pet: newPet });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating pet", error: error.message });
  }
};

export const getMyPets = async (req, res) => {
  try {
    const owner_id = req.user.id;
    const pets = await getMyPetsService(owner_id);
    res.status(200).json(pets);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching pets", error: error.message });
  }
};

export const getPetById = async (req, res) => {
  try {
    const owner_id = req.user.id;
    const { pet_id } = req.params;

    const pet = await getPetByIdService(pet_id, owner_id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });

    res.status(200).json(pet);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching pet", error: error.message });
  }
};

export const deletePet = async (req, res) => {
  try {
    const owner_id = req.user.id;
    const { pet_id } = req.params;

    const deleted = await deletePetService(pet_id, owner_id);
    if (!deleted) return res.status(404).json({ message: "Pet not found" });

    res.status(200).json({ message: "Pet deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting pet", error: error.message });
  }
};

export const updatePet = async (req, res) => {
  try {
    const owner_id = req.user.id;
    const { pet_id } = req.params;
    const newPetData = req.body; // New data for the pet

    const updatedPet = await updatePetService(pet_id, owner_id, newPetData);
    return res
      .status(200)
      .json({ message: "Pet updated successfully", pet: updatedPet });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating pet", error: error.message });
  }
};
