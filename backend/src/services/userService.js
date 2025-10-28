import bcrypt from "bcryptjs";
import User from "../models/users/userModel.js";
import PetOwner from "../models/users/petOwnerModel.js";
import ClinicAdmin from "../models/users/clinicAdminModel.js";
import VetProfessional from "../models/users/vetProfessionalModel.js";

export const registerUser = async (userData) => {
  const { full_name, email, password, user_type, address, clinic_name } = userData;
  console.log("Hi userData", userData);
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new Error("Email already registered");

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      full_name,
      email,
      password_hash: hashedPassword,
      user_type,
    });

    if (user_type === "pet_owner") {
      await PetOwner.create({ user_id: user.id, address });
    } else if (user_type === "clinic_admin") {
      await ClinicAdmin.create({ user_id: user.id, clinic_name });
    }

    return user;
  } catch (err) {
    console.error("Error register user", err.message);
    throw err;
  }
};

export const registerVetProfessional = async (data, adminUserId) => {
  // Optionally, verify if adminUserId is a ClinicAdmin
  const admin = await ClinicAdmin.findOne({ where: { user_id: adminUserId } });
  if (!admin)
    throw new Error("Only clinic admins can register vet professionals");

  const { full_name, email, password, clinic_name, license_number } = data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    full_name,
    email,
    password_hash: hashedPassword,
    user_type: "vet_professional",
  });

  await VetProfessional.create({
    user_id: user.id,
    clinic_name,
    license_number,
  });

  return user;
};
