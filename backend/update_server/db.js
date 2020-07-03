/*Ce fichier est celui qui effectue toutes les interactions de bases de données.*/
/*jshint esversion: 6 */

const  SqlString  =  require ( "sqlstring" ) ;
const  bcrypt  =  require ( "bcrypt" ) ;

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

  static Update(){
      
  }
}

module.exports.DB = DB;