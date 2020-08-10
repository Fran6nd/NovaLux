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
  res.send('Hello World!');
  console.log('Registering: ' + req.query.id_hardware);
})

app.get('/check_for_update', function (req, res) {
  res.send('Hello World!')
  console.log('req get ')
})  


app.get('/get_update', function (req, res) {
  res.send('Hello World!')
  console.log('req get ')
})  



app.listen(3000, function () {
  console.log('server listening on port 3000!')
})
