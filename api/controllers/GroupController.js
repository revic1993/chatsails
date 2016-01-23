var ObjectID = require('sails-mongo/node_modules/mongodb').ObjectID;

module.exports = {
	new  : function(req,res,next){
		var groupName = req.param('groupName'),
				username = req.param('name'),
				mobile=req.param('mobile');
				
		if(!groupName || !username || isNaN(parseInt(mobile)) || mobile.length !=10)
			return Common.returnError(res,"Enter proper parameters");

		GroupService.newGroup({groupName:groupName,user:{name:username,mobile:mobile},res:res},function(value){
			return value;
		});
	},
	newChat : function(req,res,next){
		if(!req.param('groupId') ||  !req.param('userId') || !req.param('message'))
			return Common.returnError(res,"Enter proper parameters");

		GroupService.newChat({groupId:req.param('groupId'),userId:req.param('userId'),res:res,message:req.param('message')},function(value) {
			return value;
		});
	}
};
