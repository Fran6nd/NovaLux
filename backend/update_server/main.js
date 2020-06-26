onst express = require("express");
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

app.use(session({ secret: "ssshhhhh", saveUninitialized: true, resave: true }));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/rsc"));
let logged = {};

let corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

/* This method check whether the user is logged-in or not. */
function requireLogin(req, res, next) {
  if (req.session.email && req.session.password && logged[req.session.email]) {
    next();
  } else {
    res.status(401);
    res.send("Need to be logged in to perform this action...");
    res.end();
  }
}

router.post("/private/logout", (req, res) => {
  console.log('logout');
  logged[req.session.email] = undefined;
  req.session.destroy(err => {
    if (err) {
      return console.log(err);
    }
  });
  res.status(200);
  res.end(JSON.stringify({ status: "Done" }));
});

router.post("/public/login", (req, res) => {
  let sess = req.session;
  sess.email = req.body.email;
  sess.password = req.body.password;
  if (DB.readUser(sess.email, sess.password)) {
    logged[sess.email] = true;
    res.end(JSON.stringify({ status: "Done" }));
  } else {
    res.status(400);
    logged[req.session.email] = undefined;
    req.session.destroy();
    res.end(JSON.stringify({ status: "Failed" }));
  }
});



router.post("/public/newUser", (req, res) => {
  if (DB.isEmailFree(req.body.email)) {
    DB.addUser(req.body.email, req.body.password);
    res.status(200);
    res.end(JSON.stringify({ status: "Done" }));
  } else {
    res.status(400);
    res.end(JSON.stringify({ status: "Failed" }));
  }
});

router.get("/private/getBatteries", (req, res) => {
  res.status(200);
  res.end(JSON.stringify(DB.readBatteries(req.session.email)));
});

router.get("/private/rmBattery", (req, res) => {
  let id = req.query["id"];
  let result = DB.rmBattery(id, req.session.email);
  if (result) {
    res.status(200);
    res.end(JSON.stringify(DB.readBatteries(req.session.email)));
  } else {
    res.status(412);
    res.end();
  }
});

router.get("/private/addBattery", (req, res) => {
  let result = DB.addBattery(req.session.email);
  res.status(200);
  res.end(JSON.stringify(DB.readBatteries(req.session.email)));
});

router.get("/private/updateBatteryUse", (req, res) => {
  let id = req.query["id"];
  let date = req.query["date"];
  let count = req.query["count"];
  DB.setDailyUse(id, date, count);
  res.end(JSON.stringify(DB.readBatteries(req.session.email)));
});

router.get("/private/addBattery", (req, res) => {
  res.status(200);
  res.end(JSON.stringify(DB.readBatteries(req.session.email)));
});

/* Lets require login for all /private/ routes. */
app.use("/private**", function (req, res, next) {
  requireLogin(req, res, next);
});

router.get("*", function (req, res) {
  console.log(JSON.stringify(req.body))
  res.status(404).send("what???");
});

app.use(router);

app.listen(process.env.PORT || 3000, () => {
  console.log(`App Started on PORT ${process.env.PORT || 3000}`);
});
