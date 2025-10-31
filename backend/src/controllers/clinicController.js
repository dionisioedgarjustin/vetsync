import { registerClinic, updateClinic } from "../services/clinicService.js";

export const registerNewClinic = async (req, res) => {
  try {
    const adminUserId = req.user.id; // from JWT
    const clinicData = req.body;
    const newClinic = await registerClinic(clinicData, adminUserId);
    res
      .status(201)
      .json({ message: "Clinic registered successfully", clinic: newClinic });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering clinic", error: error.message });
  }
}

export const updateClinicDetails = async (req, res) => {
  // Implementation for updating clinic details goes here

  try{
    const adminUserId = req.user.id; // from JWT
    const clinicId = req.params.clinicId;
    const updateData = req.body;
    // Assuming there's a service function to handle the update
    const updatedClinic = await updateClinic(clinicId, updateData, adminUserId);

    res
      .status(200)
      .json({ message: "Clinic details updated successfully", clinic: updatedClinic });

  } catch (err) {
    console.error("Error updating clinic details", err.message);
    res
      .status(500)
      .json({ message: "Error updating clinic details", error: err.message });
  }
}

