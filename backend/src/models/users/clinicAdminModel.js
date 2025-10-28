import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";
import User from "./userModel.js";

const ClinicAdmin = sequelize.define("ClinicAdmin", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: User, key: "id" },
  },
  clinic_name: { type: DataTypes.STRING, allowNull: false },
  clinic_address: DataTypes.TEXT,
}, {
  tableName: "clinic_admins",
  timestamps: false,
});

User.hasOne(ClinicAdmin, { foreignKey: "user_id" });
ClinicAdmin.belongsTo(User, { foreignKey: "user_id" });

export default ClinicAdmin;