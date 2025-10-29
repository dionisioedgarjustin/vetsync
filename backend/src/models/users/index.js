import sequelize from '../../config/db.js';
import User from './userModel.js';
import PetOwner from './petOwnerModel.js';
import ClinicAdmin from './clinicAdminModel.js';
import VetProfessional from './vetProfessionalModel.js';

// Sync all models with the database
const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true }); // or { force: true } for dev reset // default alter: true
    console.log('Database & tables synced successfully!');
  } catch (err) {
    console.error('Error syncing database:', err);
  }
};

export { sequelize, User, PetOwner, ClinicAdmin, VetProfessional, syncDB };