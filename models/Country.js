var mysql 		= require('mysql');
var dbconfig 	= require('../config/database');
var connection 	= mysql.createConnection(dbconfig.connection);
	connection.query('USE ' + dbconfig.database);
const tableName = 'country';

var Country={
	countrylist:function(callback){
		return connection.query("SELECT * FROM "+tableName+" WHERE status =1", callback);
	}
}