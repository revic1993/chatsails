/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new : function(req,res,next){

		var name = req.param('user'),
		 		mobile = req.param('mobile');

		if(!name || !mobile || isNaN(parseInt(mobile)) || mobile.length !=10){
			return Common.returnError(res,"Enter proper credentials");
		}

		UserService.createNewUser({mobile:mobile,name:name,res:res},function(value){
			return value;
		});
	}
};
