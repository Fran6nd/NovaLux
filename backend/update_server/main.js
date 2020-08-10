/*jshint esversion: 6 */
// use sql
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
/* The DB module manage all SQL interactions and protect them. */
const DB = require("./db.js").DB;
/* Let's initialize the database. */
//DB.start();

app.get('/register', function (req, res) {
  res.send('{checking_day: 1, checking_time: 1}');
  console.log('Registering: ' + req.query.id_hardware);
})

app.get('/check_for_update', function (req, res) {
  res.send('{available_ubdate: false}');
  console.log('Checking for updates: ' + req.query.id_hardware + ' version: ' + req.query.id_version);
})  

app.get('/get_update', function (req, res) {
  res.send('Hello World!')
  console.log('Update asked from: ' + req.query.id_hardware);
})  



app.listen(3000, function () {
  console.log('server listening on port 3000!')
})
