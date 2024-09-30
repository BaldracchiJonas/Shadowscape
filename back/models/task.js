const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Task = sequelize.define('Task', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', // References the User table
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    status_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'status', // References the Status table
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    tableName: 'task',
    timestamps: false,
  });

  // Set up associations
  Task.associate = (models) => {
    Task.belongsTo(models.User, { foreignKey: 'user_id' });
    Task.belongsTo(models.Status, { foreignKey: 'status_id' });
  };

  return Task;
};
