require("dotenv/config");

const express = require("express");
const morganBody = require("morgan-body");
const cors = require("cors");
const { dbConnection } = require("./config/connection");

const { processFiles } = require('./services/processUssd'); 

const app = express();

app.use(cors());
app.use(express.json());

const engine = process.env.DB_ENGINE || null;
const port = Number(process.env.PORT) || 3000;

morganBody(app, {
  skip: function (req, res) {
    return [403, 404, 409, 401].includes(res.statusCode) || res.statusCode < 400;
  },
});

/**
 * Define your database engine
 */
if (engine === "postgres") {
  (async () => {
    await dbConnection();
    processFiles();
  })();   
}
/**
 * API Rest
 */
app.use("/api", require("./routes"));

app.listen(port, () => {
  console.log(`Your server is ready by the port ${port}`);
});

