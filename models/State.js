var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
	connection.query('USE ' + dbconfig.database);
const tableName = 'state';

var Country={
	statelist:function(callback){
		return connection.query("SELECT * FROM "+tableName+" WHERE status =1 Order By name", callback);
	},
	statelistByCountryId:function($countryId, callback){
		return connection.query("SELECT * FROM "+tableName+" WHERE country='"+$countryId+"' And status=1 Order By name", callback);
	}
}