import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";
import User from "./userModel.js";

const PetOwner = sequelize.define("PetOwner", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: User, key: "id" },
  },
  address: DataTypes.TEXT,
//   pet_name: DataTypes.STRING,
//   pet_type: DataTypes.STRING, 
//  should create pets table for better database design and to support one -> many relation for petOwner and pets
}, {
  tableName: "pet_owners",
  timestamps: false,
});

User.hasOne(PetOwner, { foreignKey: "user_id" });
PetOwner.belongsTo(User, { foreignKey: "user_id" });

export default PetOwner;