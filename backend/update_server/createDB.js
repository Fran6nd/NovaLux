const DB = require('./db.js').DB;
if (DB.start()){
    console.log(DB.query("DROP DATABASE battery_manager"));
}

console.log(DB.query("CREATE DATABASE battery_manager"));
console.log(DB.query("USE battery_manager"));
console.log(DB.query("CREATE TABLE user (email VARCHAR(100), primary key(email),password VARCHAR(100))"));
console.log(DB.query("CREATE TABLE battery (id int auto_increment, owner VARCHAR(100), primary key(id), name VARCHAR(100),FOREIGN KEY (owner) REFERENCES user(email) )"));
console.log(DB.query("CREATE TABLE daily_use (id INT, date DATE, usages INT, primary key(id, date),FOREIGN KEY (id) REFERENCES battery(id) )"));

DB.query("select * from user");

//Filling users...
DB.addUser('gogo441@gmail.com', 'gogo');
DB.addUser('simon@truc.com', 'dsfsdfsdctq');
//Filling batteries...
DB.addBattery('gogo441@gmail.com');
DB.addBattery('gogo441@gmail.com');
DB.addBattery('gogo441@gmail.com');
DB.addBattery('gogo441@gmail.com');
DB.addBattery('gogo441@gmail.com');
DB.addBattery('gogo441@gmail.com');
//Filling daily_usages...
DB.setDailyUse(1, '2020-01-05', 20);
DB.setDailyUse(1, '2020-03-05', 10);
DB.setDailyUse(1, '2015-01-06', 11);
DB.setDailyUse(1, '2020-03-07', 5);
DB.setDailyUse(1, '2020-03-07', 6);
DB.setDailyUse(1, '2020-01-08', 2);
//Updating batteries...
//DB.updateBattery(1, 'gogo441@gmail.com', 20);
//DB.rmBattery(2, 'gogo441@gmail.com');
console.log(DB.readBatteries('gogo441@gmail.com'));