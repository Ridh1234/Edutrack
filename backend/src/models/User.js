const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Revert to original single table name 'user'. With freezeTableName=true (set globally) Sequelize will not pluralize.
// Note: 'user' is a MySQL reserved keyword, but Sequelize will automatically quote identifiers.
// If you encounter issues, switch to tableName: 'user' explicitly or rename; for now we keep existing table.
const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(150), allowNull: false, unique: true, validate: { isEmail: true } },
  passwordHash: { type: DataTypes.STRING(100), allowNull: false },
  role: { type: DataTypes.ENUM('teacher', 'student'), allowNull: false }
});

module.exports = User;
