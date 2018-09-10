var apphelper={
	returnResponce:function(res,status,data){
		return res.status(status).json({data});
	},
	generateRandomNumbers:function(){
		return '12ABC2';
	},
	phonenumberValidation(inputtxt){
  		var phoneno = /^\d{10}$/;
  		var $return  = false;
  		if(inputtxt.match(phoneno)){
  			$return = true;	
  		}
        return $return;
	},
	__dateFormat($date){
	    var d = new Date($date),
	        month = '' + (d.getMonth() + 1),
	        day = '' + d.getDate(),
	        year = d.getFullYear();
	    if (month.length < 2) month = '0' + month;
	    if (day.length < 2) day = '0' + day;
	  	hour  = d.getHours();
	  	minute= d.getMinutes();
	  	second= d.getSeconds();
	  	datevalue = [year, month, day].join('-');
	  	timevalue = [hour, minute, second].join(':');
	    return datevalue+' '+timevalue;
	}
};
module.exports=apphelper;