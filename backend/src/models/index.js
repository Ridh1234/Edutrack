const { sequelize } = require('../config/db');
const User = require('./User');
const Assignment = require('./Assignment');
const Submission = require('./Submission');

// Associations
User.hasMany(Assignment, { foreignKey: { name: 'teacherId', allowNull: false }, as: 'assignments' });
Assignment.belongsTo(User, { foreignKey: { name: 'teacherId', allowNull: false }, as: 'teacher' });

User.hasMany(Submission, { foreignKey: { name: 'studentId', allowNull: false }, as: 'submissions' });
Submission.belongsTo(User, { foreignKey: { name: 'studentId', allowNull: false }, as: 'student' });

Assignment.hasMany(Submission, { foreignKey: { name: 'assignmentId', allowNull: false }, as: 'submissions' });
Submission.belongsTo(Assignment, { foreignKey: { name: 'assignmentId', allowNull: false }, as: 'assignment' });

module.exports = { sequelize, User, Assignment, Submission };