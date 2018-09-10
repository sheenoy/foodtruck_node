var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
	connection.query('USE ' + dbconfig.database);
const tableName = 'otp_verification';

var Otp_verification={
	otpInsertion:function($otpArry,callback){
		return connection.query("INSERT INTO "+tableName+" (`user_id`, `otp_type`, `otp_text`, `created_at`) VALUES ("+$otpArry.user_id+", '"+$otpArry.otp_type+"', '"+$otpArry.otp_text+"', '"+$otpArry.created_at+"')",callback);
	},
	otpExistsOrNot:function($userId,callback){
		return connection.query("SELECT * FROM "+tableName+" WHERE user_id ="+$userId, callback);
	},
	validateOtpWithUserId:function($otpArry,callback){
		return connection.query("SELECT * FROM "+tableName+" WHERE user_id ="+$otpArry.userid+" AND otp_text='"+$otpArry.otp+"'", callback);
	},
	updateExistingOtp:function($otpArry,callback){
		return connection.query("UPDATE "+tableName+" SET `otp_type`='"+$otpArry.otp_type+"',`otp_text`='"+$otpArry.otp_text+"',`created_at`='"+$otpArry.created_at+"' WHERE user_id="+$otpArry.user_id+"", callback);
	}	
};
module.exports=Otp_verification;