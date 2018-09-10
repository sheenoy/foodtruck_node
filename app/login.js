var apphelper    = require('../config/apphelper');
var constantFile = require('../config/constant');
var usersModel   = require('../models/Users');
var otpModel     = require('../models/Otp_verification');
var countryModel = require('../models/Country');

module.exports= function(app, passport,dateTime, SERVER_SECRET,API_URL) {
	
  	app.post('/api/send-otp', function (req, res) {
  		var mobile = req.body.mobile_no;
  		if(mobile==="" || mobile.trim()===""){
  			return apphelper.returnResponce(res,200,{
	          	'status'    : constantFile.STATUS,
			    'api_status': constantFile.API_STATUS,
				'data'      : constantFile.DATAPACKET,
	          	'message'   : "Please enter mobile number."
	        });
  		}else if(apphelper.phonenumberValidation(mobile) === false){
  			return apphelper.returnResponce(res,200,{
	          	'status'    : constantFile.STATUS,
			    'api_status': constantFile.API_STATUS,
				'data'      : constantFile.DATAPACKET,
	          	'message'   : "Please enter valid mobile number."
	        });
  		}else{  			
  			usersModel.authanticateDbUser(mobile, function(err, userrows){
  				if(err){ 
  					return apphelper.returnResponce(res,200,{
			          	'status'    : constantFile.STATUS,
					    'api_status': constantFile.API_STATUS,
						'data'      : constantFile.DATAPACKET,
			          	'message'   : constantFile.MESSAGE
			        });
  				}
  				if(userrows.length > 0){
  					var $otp = apphelper.generateRandomNumbers();
  					otpModel.otpExistsOrNot(userrows[0].userid, function(err, otpExists){
  						if(err){
  							return apphelper.returnResponce(res,200,{
					          	'status'    : constantFile.STATUS,
			    				'api_status': constantFile.API_STATUS,
								'data'      : constantFile.DATAPACKET,
					          	'message'   : constantFile.MESSAGE
					        });
  						}
  						var $otpArry = {
							'user_id' :userrows[0].userid,
							'otp_type':'sms',
							'otp_text': $otp,
							'created_at': apphelper.__dateFormat(new Date())
			  			};

  						if(otpExists.length>0){
		  					otpModel.updateExistingOtp($otpArry, function(err){
		  						if(err){ 
				  					return apphelper.returnResponce(res,200,{
							          	'status'    : constantFile.STATUS,
			    						'api_status': constantFile.API_STATUS,
										'data'      : constantFile.DATAPACKET,
							          	'message'   : constantFile.MESSAGE
							        });
		  						}
		  						return apphelper.returnResponce(res,200,{
						          	'status'    : true,
			    					'api_status': constantFile.API_STATUS,
						          	'data'      : {'otp': $otp},
						          	'message'   : 'Otp Sent'
						        });
		  					});
		  				}else{
		  					otpModel.otpInsertion($otpArry, function(err){
				  				if(err){ 
				  					return apphelper.returnResponce(res,200,{
							          	'status'    : constantFile.STATUS,
			    						'api_status': constantFile.API_STATUS,
										'data'      : constantFile.DATAPACKET,
							          	'message'   : constantFile.MESSAGE
							        });
				  				}
				  				return apphelper.returnResponce(res,200,{
						          	'status'    : true,
			    					'api_status': constantFile.API_STATUS,
						          	'data'      : {'otp': $otp},
						          	'message'   : 'Otp Sent'
						        });	
				  			});
		  				}
  					});
  				}else{
  					$dataArr = {
						'mobile'	: mobile,
						'email'     : '',
						'fname'     : '',
						'lname'     : '',
						'password'  : '',
						'userType'  : 0,
						'country'   : 0,
						'state' 	: 0,
						'city'		: '',
						'address'   : '',
						'latitude'  : '',
						'longitude' : '',
						'status'	: 2,
						'created'   : apphelper.__dateFormat(new Date()),
					}
					usersModel.createNewUsers($dataArr, function(err, createNew){
						if(err){
							return apphelper.returnResponce(res,200,{
								'status'    : constantFile.STATUS,
			  					'api_status': constantFile.API_STATUS,
								'data'      : constantFile.DATAPACKET,
					          	'message'   : constantFile.MESSAGE
					        });
						}
						
						if(createNew){
							var $otp = apphelper.generateRandomNumbers();
		  					otpModel.otpExistsOrNot(createNew.insertId, function(err, otpExists){
		  						if(err){
		  							return apphelper.returnResponce(res,200,{
							          	'status'    : constantFile.STATUS,
					    				'api_status': constantFile.API_STATUS,
										'data'      : constantFile.DATAPACKET,
							          	'message'   : constantFile.MESSAGE
							        });
		  						}
		  						var $otpArry = {
									'user_id' :createNew.insertId,
									'otp_type':'sms',
									'otp_text': $otp,
									'created_at': apphelper.__dateFormat(new Date())
					  			};

		  						if(otpExists.length>0){
				  					otpModel.updateExistingOtp($otpArry, function(err){
				  						if(err){ 
						  					return apphelper.returnResponce(res,200,{
									          	'status'    : constantFile.STATUS,
					    						'api_status': constantFile.API_STATUS,
												'data'      : constantFile.DATAPACKET,
									          	'message'   : constantFile.MESSAGE
									        });
				  						}
				  						return apphelper.returnResponce(res,200,{
								          	'status'    : true,
					    					'api_status': constantFile.API_STATUS,
								          	'data'      : {'otp': $otp},
								          	'message'   : 'Otp Sent'
								        });
				  					});
				  				}else{
				  					otpModel.otpInsertion($otpArry, function(err){
						  				if(err){ 
						  					return apphelper.returnResponce(res,200,{
									          	'status'    : constantFile.STATUS,
					    						'api_status': constantFile.API_STATUS,
												'data'      : constantFile.DATAPACKET,
									          	'message'   : constantFile.MESSAGE
									        });
						  				}
						  				return apphelper.returnResponce(res,200,{
								          	'status'    : true,
					    					'api_status': constantFile.API_STATUS,
								          	'data'      : {'otp': $otp},
								          	'message'   : 'Otp Sent'
								        });	
						  			});
				  				}
		  					});
		  				}else{
			  				return apphelper.returnResponce(res,200,{
			  					'status'    : constantFile.STATUS,
			  					'api_status': constantFile.API_STATUS,
			  					'data'      : constantFile.DATAPACKET,
					          	'message'   : constantFile.MESSAGE
					        });
		  				}
					});
  				}
  			});
  		}
  	});

  	app.post('/api/validate-otp', function (req, res) {
  		var mobile = req.body.mobile_no;
  		var otpText= req.body.otp_text;
  		if(mobile==="" || mobile.trim()===""){
  			return apphelper.returnResponce(res,200,{
	          	'status'    : constantFile.STATUS,
			    'api_status': constantFile.API_STATUS,
				'data'      : constantFile.DATAPACKET,
	          	'message'   : "Please provide the mobile number."
	        });
  		}
  		if(apphelper.phonenumberValidation(mobile) === false){
  			return apphelper.returnResponce(res,200,{
	          	'status'    : constantFile.STATUS,
			    'api_status': constantFile.API_STATUS,
				'data'      : constantFile.DATAPACKET,
	          	'message'   : "Please provide valid mobile number."
	        });
  		}
  		if(otpText==="" || otpText.trim()===""){
  			return apphelper.returnResponce(res,200,{
	          	'status'    : constantFile.STATUS,
			    'api_status': constantFile.API_STATUS,
				'data'      : constantFile.DATAPACKET,
	          	'message'   : "Please enter your otp."
	        });
  		}

		usersModel.authanticateDbUser(mobile, function(err, userrows){
			if(err){ 
				return apphelper.returnResponce(res,200,{
			      	'status'    : constantFile.STATUS,
			    	'api_status': constantFile.API_STATUS,
					'data'      : constantFile.DATAPACKET,
			        'message'   : constantFile.MESSAGE
				});
			}
			if(userrows.length > 0){
				otpModel.validateOtpWithUserId({"userid":userrows[0].userid,'otp':otpText}, function(err, otpExists){
					if(err){ 
						return apphelper.returnResponce(res,200,{
				          	'status'    : constantFile.STATUS,
			    			'api_status': constantFile.API_STATUS,
							'data'      : constantFile.DATAPACKET,
				          	'message'   : constantFile.MESSAGE
				        });
					}
					if(otpExists.length > 0){
						usersModel.getUsersDetailById(userrows[0].userid, function(err, userlist){
							if(err){ 
								return apphelper.returnResponce(res,200,{
						          	'status'    : constantFile.STATUS,
					    			'api_status': constantFile.API_STATUS,
									'data'      : constantFile.DATAPACKET,
						          	'message'   : constantFile.MESSAGE
						        });
							}
							return apphelper.returnResponce(res,200,{
					          	'status'    : true,
				    			'api_status': constantFile.API_STATUS,
								'data'      : userlist,
					          	'message'   : 'Login Successfull'
					        });
				        });
	  				}else{
		  				return apphelper.returnResponce(res,200,{
				          	'status'    : constantFile.STATUS,
			    			'api_status': constantFile.API_STATUS,
							'data'      : constantFile.DATAPACKET,
				          	'message'   : 'Invalid OTP'
				        });
	  				}
				});
			}else{
				return apphelper.returnResponce(res,200,{
		          	'status'    : constantFile.STATUS,
			    	'api_status': constantFile.API_STATUS,
		          	'data'      : {'otp': $otp},
		          	'message'   : 'Invalid OTP'
		        });
			}
		});
  	});

  	app.post('/api/signup', function (req, res) {
  		var first_name= req.body.first_name;
  		var last_name = req.body.last_name;
  		var mobile    = req.body.mobile_no;
  		var email_id  = req.body.email_id;
  		var country   = req.body.country;
  		var state     = req.body.state;
  		var city      = req.body.city;
  		var address   = req.body.address;
  		var latitude  = req.body.latitude;
  		var longitude = req.body.longitude;

  		if(first_name==="" || first_name.trim()===""){
  			return apphelper.returnResponce(res,200,{
	          	'status'    : constantFile.STATUS,
			    'api_status': constantFile.API_STATUS,
				'data'      : constantFile.DATAPACKET,
	          	'message'   : "Please enter first name."
	        });
  		} 
  		if(last_name==="" || last_name.trim()===""){
  			return apphelper.returnResponce(res,200,{
	          	'status'    : constantFile.STATUS,
			    'api_status': constantFile.API_STATUS,
				'data'      : constantFile.DATAPACKET,
	          	'message'   : "Please enter last name."
	        });
  		}
  		if(mobile==="" || mobile.trim()===""){
  			return apphelper.returnResponce(res,200,{
	          	'status'    : constantFile.STATUS,
			    'api_status': constantFile.API_STATUS,
				'data'      : constantFile.DATAPACKET,
	          	'message'   : "Please enter mobile Number."
	        });
  		}
  		if(apphelper.phonenumberValidation(mobile) === false){
  			return apphelper.returnResponce(res,200,{
	          	'status'    : constantFile.STATUS,
			    'api_status': constantFile.API_STATUS,
				'data'      : constantFile.DATAPACKET,
	          	'message'   : "Please enter valid mobile number."
	        });
  		}
  		if(country==="" || country.trim()===""){
  			return apphelper.returnResponce(res,200,{
	          	'status'    : constantFile.STATUS,
			    'api_status': constantFile.API_STATUS,
				'data'      : constantFile.DATAPACKET,
	          	'message'   : "Please select country."
	        });
  		}
  		if(state==="" || state.trim()===""){
  			return apphelper.returnResponce(res,200,{
	          	'status'    : constantFile.STATUS,
			    'api_status': constantFile.API_STATUS,
				'data'      : constantFile.DATAPACKET,
	          	'message'   : "Please select state."
	        });
  		}
  		if(city==="" || city.trim()===""){
  			return apphelper.returnResponce(res,200,{
	          	'status'    : constantFile.STATUS,
			    'api_status': constantFile.API_STATUS,
				'data'      : constantFile.DATAPACKET,
	          	'message'   : "Please enter city name."
	        });
  		}
  		if(address==="" || address.trim()===""){
  			return apphelper.returnResponce(res,200,{
	          	'status'    : constantFile.STATUS,
			    'api_status': constantFile.API_STATUS,
				'data'      : constantFile.DATAPACKET,
	          	'message'   : "Please enter address."
	        });
  		}

		usersModel.authanticateDbUser(mobile, function(err, userrows){
			if(err){ 
				return apphelper.returnResponce(res,200,{
			      	'status'    : constantFile.STATUS,
  					'api_status': constantFile.API_STATUS,
					'data'      : constantFile.DATAPACKET,
			        'message'   : constantFile.MESSAGE
				});
			}
			if(userrows.length > 0){
				return apphelper.returnResponce(res,200,{
		          	'status'    : constantFile.STATUS,
  					'api_status': constantFile.API_STATUS,
					'data'      : constantFile.DATAPACKET,
		          	'message'   : 'User already exists'
		        });
			}else{
				$dataArr = {
					'mobile'	: mobile,
					'email'     : email_id,
					'fname'     : first_name,
					'lname'     : last_name,
					'password'  : '',
					'userType'  : 4,
					'country'   : country,
					'state' 	: state,
					'city'		: city,
					'address'   : address,
					'latitude'  : '',
					'longitude' : '',
					'status'	: 1,
					'created'   : apphelper.__dateFormat(new Date()),
				}
				usersModel.createNewUsers($dataArr, function(err, createNew){
					if(err){ 
						return apphelper.returnResponce(res,200,{
							'status'    : constantFile.STATUS,
		  					'api_status': constantFile.API_STATUS,
							'data'      : constantFile.DATAPACKET,
				          	'message'   : constantFile.MESSAGE
				        });
					}
					
					if(createNew){
						usersModel.getUsersDetailById(createNew.insertId, function(err, userlist){
		  					return apphelper.returnResponce(res,200,{
		  						'status'    : true,
		  						'api_status': constantFile.API_STATUS,
		  						'data'      : userlist,
					          	'message'   : 'User has been created successfully.'
					        });
				        });
	  				}else{
		  				return apphelper.returnResponce(res,200,{
		  					'status'    : constantFile.STATUS,
		  					'api_status': constantFile.API_STATUS,
		  					'data'      : constantFile.DATAPACKET,
				          	'message'   : constantFile.MESSAGE
				        });
	  				}
				});
			}
		});
  	});

	app.get('/api/countrylist', function (req, res) {
		countryModel.countrylist(function(err,countrylist){
			if(err){
				return apphelper.returnResponce(res,200,{
		          	'status'    : constantFile.STATUS,
				    'api_status': constantFile.API_STATUS,
					'data'      : constantFile.DATAPACKET,
		          	'message'   : "Something wrong."
		        });
			}
			return apphelper.returnResponce(res,200,{
	          	'status'    : constantFile.STATUS,
			    'api_status': constantFile.API_STATUS,
				'data'      : countrylist,
	          	'message'   : "Please enter first name."
	        });
		});
  	});

  	app.get('/api/statelist', function (req, res) {
  		var countryid = req.body.country_id;
  		if(countryid!=="" || countryid.trim()!=""){
  			StateModel.statelistByCountryId(countryid, function(err,countrylist){
  				if(err){
					return apphelper.returnResponce(res,200,{
			          	'status'    : constantFile.STATUS,
					    'api_status': constantFile.API_STATUS,
						'data'      : constantFile.DATAPACKET,
			          	'message'   : constantFile.MESSAGE,
			        });
				}
				return apphelper.returnResponce(res,200,{
		          	'status'    : constantFile.STATUS,
				    'api_status': constantFile.API_STATUS,
					'data'      : countrylist,
		          	'message'   : "State List."
		        });
			});
  		}else{
  			StateModel.statelist(function(err,countrylist){
				if(err){
					return apphelper.returnResponce(res,200,{
			          	'status'    : constantFile.STATUS,
					    'api_status': constantFile.API_STATUS,
						'data'      : constantFile.DATAPACKET,
			          	'message'   :  constantFile.MESSAGE,
			        });
				}
				return apphelper.returnResponce(res,200,{
		          	'status'    : constantFile.STATUS,
				    'api_status': constantFile.API_STATUS,
					'data'      : countrylist,
		          	'message'   : "State List."
		        });
			});
  		}
  	});
}