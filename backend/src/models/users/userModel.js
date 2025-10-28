import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password_hash: { type: DataTypes.STRING, allowNull: false },
  full_name: { type: DataTypes.STRING, allowNull: false },
  user_type: {
    type: DataTypes.ENUM("pet_owner", "vet_professional", "clinic_admin", "system_admin"),
    allowNull: false,
  },
  phone_number: DataTypes.STRING,
  profile_image_url: DataTypes.STRING,
}, {
  tableName: "users",
  timestamps: true,
});

export default User;