/*jshint esversion: 6 */
// use sql
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
/* The DB module manage all SQL interactions and protect them. */
const DB = require("./db.js").DB;
/* The cors module is used to allow CROSS ORIGIN REQUESTS from the website to the API. */
const cors = require("cors");
/* Let's initialize the database. */
DB.start();

let corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
