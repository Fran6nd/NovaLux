const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
/* The DB module manage all SQL interactions and protect them. */
const DB = require("./db.js").DB;
/* Let's initialize the database. */
DB.start();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/rsc"));

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

router.get("*", function (req, res) {
  console.log(JSON.stringify(req.body))
  res.status(404).send("what???");
});

app.use(router);

app.listen(process.env.PORT || 3000, () => {
  console.log(`App Started on PORT ${process.env.PORT || 3000}`);
});
