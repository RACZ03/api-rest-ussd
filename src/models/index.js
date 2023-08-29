const engine = process.env.DB_ENGINE || null;

const pathModel = engine === "postgres" ? "./postgresql" : "./mysql"

const models = {
  cdrLogModel: require(`${pathModel}/cdr_logs`),
  callDetailRecordModel: require(`${pathModel}/call_detail_record`),
};


module.exports = models;