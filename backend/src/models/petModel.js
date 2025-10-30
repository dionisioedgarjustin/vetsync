import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./users/userModel.js";

const Pet = sequelize.define("Pet", {
  pet_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id", // links to User's primary key
    },
    onDelete: "CASCADE", // if owner is deleted, pet is deleted
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  species: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  breed: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  birthdate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  gender: {
    type: DataTypes.ENUM("Male", "Female"),
    allowNull: false,
  },
  profileURL: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: "pets",
  timestamps: false,
});

User.hasMany(Pet, { foreignKey: "owner_id", as: "pets" });
Pet.belongsTo(User, { foreignKey: "owner_id", as: "owner" });

export default Pet;
