const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/connection');

const CallDetailRecord = sequelize.define(
  "CallDetailRecord",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    record_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    l_spc: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    l_ssn: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    l_ri: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    l_gt_i: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    l_gt_digits: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    r_spc: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    r_ssn: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    r_ri: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    r_gt_i: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    r_gt_digits: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    service_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    or_nature: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    or_plan: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    or_digits: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    de_nature : {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    de_plan: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    de_digits: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isdn_nature: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isdn_plan: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    msisdn: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vlr_nature: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    vlr_plan: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    vlr_digits: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imsi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tstamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    local_dialog_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    remote_dialog_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    dialog_duration: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    ussd_string: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    timestamps: false,
    schema: 'ussd_2',
    tableName: 'call_detail_record'
  }
);

module.exports = CallDetailRecord;