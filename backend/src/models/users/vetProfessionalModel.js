import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";
import User from "./userModel.js";
import ClinicAdmin from "./clinicAdminModel.js";

const VetProfessional = sequelize.define("VetProfessional", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: User, key: "id" },
  },
//   license_number: { type: DataTypes.STRING, allowNull: false },
  specialization: DataTypes.STRING,
  clinic_admin_id: { 
    type: DataTypes.INTEGER,
    references: { model: ClinicAdmin, key: "user_id" },
    onDelete: "SET NULL",
  },
}, {
  tableName: "vet_professionals",
  timestamps: false,
});

// Associations
User.hasOne(VetProfessional, { foreignKey: "user_id" });
VetProfessional.belongsTo(User, { foreignKey: "user_id" });

ClinicAdmin.hasMany(VetProfessional, { foreignKey: "clinic_admin_id" });
VetProfessional.belongsTo(ClinicAdmin, { foreignKey: "clinic_admin_id" });

export default VetProfessional; 