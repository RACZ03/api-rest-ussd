const fs = require('fs');
const readline = require('readline'); 
const path = require('path');
const moment = require('moment');

const { cdrLogModel, callDetailRecordModel } = require("../models");


const folderPath = process.env.FILE_UPLOAD_DIR || '';

const processFiles = async () => {
  console.log('START PROCESS');

  if (!fs.existsSync(folderPath) || !fs.lstatSync(folderPath).isDirectory()) {
    throw new Error('Invalid folder path');
  }

  try {
    const files = fs.readdirSync(folderPath);
    if (!files || files.length === 0) {
      console.log('No files to process');
      return;
    }

    for (const fileName of files) {
      const filePath = path.join(folderPath, fileName);
      if (fs.statSync(filePath).isFile()) {
        await processSingleFile(filePath);
      }
    }
  } catch (error) {
    console.error(error);
  }

  console.log('END PROCESS');
};

const processSingleFile = async (filePath) => {
  const fileName = path.basename(filePath);

  try {
    const existingCdrLog = await cdrLogModel.findOne({
      where: { file_name: fileName },
    });


    if (existingCdrLog !== null) {
      console.log('The file has already been processed');
      return;
    }
    // generate id for cdrLog sequence sequelize
    let id = await cdrLogModel.max('id');
    const cdrLog = await cdrLogModel.create({
      id: id + 1,
      file_name: fileName,
      start_time: new Date(),
      records_loaded: 0,
      records_failed: 0,
    });

    fs.readFile(filePath, 'utf8', async (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }

      const lines = data.split(/\r?\n/);
      for (const line of lines) {
        if (!line) {
          continue;
        }
        const recordLoaded = await processSingleRecord(line);

        if (recordLoaded) {
          cdrLog.records_loaded++;
        } else {
          cdrLog.records_failed++;
        }
      }

      cdrLog.end_time = new Date();
      await cdrLog.save();
    });


    fileStream.pipe(parser);

  } catch (error) {
    console.error('Error processing file:', error);
  }
};

const processSingleRecord = async (line) => {
  try {
    const fields = line.split('|');

    const cdr = await callDetailRecordModel.create({
      id: fields[32],
      record_date: moment(fields[0], 'yyyy-MM-dd HH:mm:ss[.SSS][.SS][.S]').toDate(),
      l_spc: parseInt(fields[1]) || null,
      l_ssn: parseInt(fields[2]) || null,
      l_ri: parseInt(fields[3]) || null,
      l_gt_i: parseInt(fields[4]) || null,
      l_gt_digits: fields[5] || null,
      r_spc: parseInt(fields[6]) || null,
      r_ssn: parseInt(fields[7]) || null,
      r_ri: parseInt(fields[8]) || null,
      r_gt_i: parseInt(fields[9]) || null,
      r_gt_digits: fields[10] || null,
      service_code: fields[11] || null,
      or_nature: parseInt(fields[12]) || null,
      or_plan: parseInt(fields[13]) || null,
      or_digits: fields[14] || null,
      de_nature: parseInt(fields[15]) || null,
      de_plan: parseInt(fields[16]) || null,
      de_digits: fields[17] || null,
      isdn_nature: parseInt(fields[18]) || null,
      isdn_plan: parseInt(fields[19]) || null,
      msisdn: fields[20] || null,
      vlr_nature: parseInt(fields[21]) || null,
      vlr_plan: parseInt(fields[22]) || null,
      vlr_digits: fields[23] || null,
      imsi: fields[24] || null,
      status: fields[25] || null,
      type: fields[26] || null,
      tstamp: moment(fields[27], 'yyyy-MM-dd HH:mm:ss[.SSS][.SS][.S]').toDate(),
      local_dialog_id: parseInt(fields[28]) || null,
      remote_dialog_id: parseInt(fields[29]) || null,
      dialog_duration: parseInt(fields[30]) || null,
      ussd_string: fields[31] || null,
    });

    return true;
  } catch (error) {
    console.error('Error processing record:', error);
    return false;
  }
};

module.exports = { processFiles };