module.exports = {
	createNewUser : function(params,callback){
		var mobile = params.mobile, name = params.name,res = params.res;
		User.findOne({mobile:mobile},function(err,user){			
			if(err)
				return callback(Common.returnError(res,"Server side error"));
							 
			if(user){
				Membership.find({user:user.id}).populate('group').
				exec(function(err,members){
					if(err)
						return callback(Common.returnError(res,"Group for users gave error"));					
					
					if(!members.length){											
						return callback(Common.returnOk(res,"User already exist",{user:user,newUser:false,hasGroup:false}));
					}else{
						var groupList = [];	
						while(members.length){							
							groupList.push(members.pop().group);
						}
						return callback(Common.returnOk(res,"User already exist with groups",{user:user,newUser:false,group:groupList,hasGroup:true}));
					}					
				});
				 	
			}else{									
				User.create({name:name,mobile:parseInt(mobile)},function(err,created){
					if(err)
						return callback( Common.returnError(res,"Error creating user!"));
										 					
					return callback(Common.returnOk(res,"User successfully created",{user:created,newUser:true,hasGroup:false}));				 
				});
			}
		});
	}
}