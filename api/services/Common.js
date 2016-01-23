module.exports = {
	returnError: function(res,errorMsg){
		return res.badRequest({"error":true,"message":errorMsg});
	},
	returnOk: function(res,message,data){
		if(!data) 
			return res.ok({"error":false,"message":message});
		
		return res.ok({"error":false,"message":message,"data":data});
	}
}