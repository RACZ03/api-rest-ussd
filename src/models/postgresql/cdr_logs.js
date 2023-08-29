const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/connection');

const CrdLog = sequelize.define(
    "CrdLog",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      file_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      records_loaded: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      records_failed: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      schema: 'ussd_2',
      tableName: 'cdr_logs',
    }
);
  
module.exports = CrdLog;