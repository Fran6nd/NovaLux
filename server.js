const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
var cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.json());
//const cors = require("cors");
//app.use(cors());

var con = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'root',
    database: 'viridilux'
});

app.get("/register", function (req, res) {
    con.connect(function (err) {
        console.log("successfully conected to database");
        con.query("select * from utilisateur", function (err, result, fields) {
            console.log(result);
            console.log();
            console.log(err);
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
            
        });
    });
});
app.get("/error", function (req, res) {
    res.status(404).send('Not found');
});
//checking odd day && checking time
app.get("/register/:id_hardware",function(req,res){
    con.connect(function(err){
        const sql = 'SELECT * FROM devices WHERE id_hardware = ?';
        const value = req.params.id_hardware;
        con.query(sql,value,function(err,result,fields){
            if (err){
                console.log(err);
                res.status(503).end();
            }else {
                console.log(`Get fom id = ${value}  success`, result);
                res.end(JSON.stringify(result));
            }
        });
    });
});
//check for update

app.listen(10002, () => {
    console.log("Server is running on port 10002.");
  });