*
This file is the one doing all databases interactions.
Every CRUD should go through it.
Be aware that if you modify this file that we MUST use SqlString.format() to prevent sql injection.
Moreover, we use the bcrypt module to store hash of passwords... No password directly stored in DB!
Finally, to avoid SQL injection, we use sqlString.
*/

const SqlString = require("sqlstring");
const bcrypt = require("bcrypt");

class DB {
  static start() {
    var MySql = require('sync-mysql');

    this.connection = new MySql({
      host: 'localhost',
      user: 'newuser',
      password: 'password'
    });
    let databases = this.query("SHOW DATABASES");
    let found = false;
    for (let i = 0; i < databases.length; i++) {
      if (databases[i].Database == 'battery_manager') {
        found = true;
      }
    }
    if (found == true) {
      this.connection.query('USE battery_manager;');
    }
    return found;

  }
  static end() {
  }
  static query(request) {
    return this.connection.query(request);
  }
  static readUser(mail, password) {
    let result = this.connection.query(
      SqlString.format("SELECT * FROM user WHERE email = ?", [mail])
    );

    let output = false;
    if (result.length === 1) {
      output = result[0];
      if (bcrypt.compareSync(password, output["password"])) {
        output["password"] = undefined;
        return output;
      }
    }
    return output;
  }
  static addUser(mail, password) {
    password = bcrypt.hashSync(password, 10);
    let result = this.connection.query(SqlString.format("INSERT INTO user (email, password) VALUES (?, ?)", [mail, password]));
  }
  static readBatteries(mail) {
    let result = this.connection.query(SqlString.format("SELECT * FROM battery WHERE owner = ?", [mail]));
    for (let i = 0; i < result.length; i++) {
      let id = result[i]['id'];
      result[i]['usages'] = {};
      let usages = this.readDailyUse(id);
      for (let j = 0; j < usages.length; j++) {
        result[i]['usages'][[usages[j]['date']]] = usages[j]['usages'];
      }


    }
    return result;
  }
  static addBattery(mail, name = 'no-name') {
    let result = this.connection.query(SqlString.format("INSERT INTO battery (owner, name) VALUES (?, ?)", [mail, name]));
  }
  static batteryExist(id) {
    let result = this.connection.query(SqlString.format("SELECT * FROM battery WHERE id = ?;", [id]));
    if (result.length == 0) {
      return false;
    }
    return true;

  }
  static rmBattery(id, owner) {
    if (this.batteryExist(id)) {
      let result = this.connection.query(SqlString.format("DELETE FROM battery WHERE id = ? AND owner = ?", [id, owner]));
      return true;
    }
    return false;
  }
  static setDailyUse(id, date, usages) {
    if (!this.dailyUseExist(id, date)) {
      let result = this.connection.query(SqlString.format("INSERT INTO daily_use (id, date, usages) VALUES (?, ?, ?);", [id, date, usages]));
    }
    else {
      this.connection.query(SqlString.format("UPDATE daily_use SET usages = ?\n WHERE id = ? \nAND date = ?;", [usages, id, date]));
    }
  }
  static readDailyUse(id) {
    let result = this.connection.query(SqlString.format("SELECT * FROM daily_use WHERE id = ?", [id]));
    return result;
  }
  static dailyUseExist(id, date) {
    let result = this.connection.query(SqlString.format("SELECT * FROM daily_use WHERE id = ? AND date =?;", [id, date]));
    if (result.length == 0) {
      return false;
    }
    return true;
  }
  static isEmailFree(mail) {
    let result = this.connection.query(SqlString.format("SELECT * FROM user WHERE email = ?;", [mail]));
    if (result.length == 0) {
      return true;
    }
    return false;
  }

}

module.exports.DB = DB;