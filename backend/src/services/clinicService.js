import ClinicAdmin from "../models/users/clinicAdminModel.js";
import Clinic from "../models/clinicModel.js";

export const registerClinic = async (clinicData, adminUserId) => {

  const admin = await ClinicAdmin.findOne({ where: { user_id: adminUserId } });
  if (!admin) throw new Error("Only clinic admins can register clinics");

//   const { name, address, contact_number, email } = clinicData; //for validation if needed

  const newClinic = await Clinic.create({
    owner_id: adminUserId,
    ...clinicData,
  });
  return newClinic;
};

export const updateClinic = async (clinicId, updateData, adminUserId) => {

  const admin = await ClinicAdmin.findOne({ where: { user_id: adminUserId } });

  if (!admin) throw new Error("Only clinic admins can update clinic details"); 
    const clinic = await Clinic.findOne({ where: { clinic_id: clinicId } });

    if (!clinic) throw new Error("Clinic not found");

    if (clinic.owner_id !== adminUserId) {
        throw new Error("You do not have permission to update this clinic");
    }

    await clinic.update(updateData);
    return clinic;
}
