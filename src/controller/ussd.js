const { Op } = require("sequelize");

const dbConnection = require("../config/connection");

const searchRecords = async (req, res) => {
  try {


    const {
      record_date_start,
      record_date_end,
      msisdn,
      imsi
    } = req.body;


    const query = `SELECT cdr.*
      FROM ussd_2.call_detail_record cdr
      WHERE TO_TIMESTAMP(cdr.record_date::text, 'YYYY-MM-DD HH24:MI:SS') BETWEEN :record_date_start AND :record_date_end
      AND (NULLIF(:msisdn, '') IS NULL OR cdr.msisdn = :msisdn)
      AND (NULLIF(:imsi, '') IS NULL OR cdr.imsi = :imsi)`;

    const records = await dbConnection.sequelize.query(query, {
      replacements: {
        record_date_start,
        record_date_end,
        msisdn: (msisdn || '').trim(),
        imsi: (imsi || '').trim()
      },
      type: dbConnection.sequelize.QueryTypes.SELECT
    });

    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "An error occurred" });
  }
};

module.exports = {
  searchRecords
};