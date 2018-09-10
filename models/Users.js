var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
	connection.query('USE ' + dbconfig.database);
const tableName = 'users';

var Users={
	authanticateDbUser:function(mobile, callback){
		return connection.query("SELECT *, id As userid FROM "+tableName+" WHERE mobile = "+mobile+" Limit 1", callback);
	},
	createNewUsers:function($dataArr,callback){
		return connection.query("INSERT INTO "+tableName+" (`mobile`,`email`,`first_name`,`last_name`,`password`,`user_type`,`country`,`state`,`city`,`address`,`status`,`created_at`) VALUES ('"+$dataArr.mobile+"', '"+$dataArr.email+"', '"+$dataArr.fname+"', '"+$dataArr.lname+"','"+$dataArr.password+"',"+$dataArr.userType+","+$dataArr.country+","+$dataArr.state+",'"+$dataArr.city+"','"+$dataArr.address+"',"+$dataArr.status+",'"+$dataArr.created+"')",callback);
	},
	getUsersDetailById:function($userid,callback){
		return connection.query("SELECT *, IF(status=1,'Active','Inactive') AS status_user,IF(user_type=4,'Customer','Other') AS userType,IF(user_type=4,'Customer','Other') AS userType  FROM "+tableName+" WHERE id ="+$userid+"", callback);
	}
};
module.exports=Users;