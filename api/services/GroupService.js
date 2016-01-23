// var ObjectId = require('sails-mongo/node_modules/mongodb').ObjectID;

module.exports = {

	newGroup : function(params,callback){
		var res = params.res;
		User.findOne({mobile:params.user.mobile},function(err,user){
			if(err) 
				return callback(Common.returnError(res,"Error finding user"));

			if(!user)
				return callback(Common.returnError(res,"No such user exist"));

			Group.findOne({name:params.groupName},function(err,group){
				if(err) 
					return callback(Common.returnError(res,"Error finding group"));

				if(group){
					Membership.find({user:user.id,group:group.id}).populate('group').populate('user')
					.exec(function(err,members){
						if(err)
							return callback(Common.returnError(res,"Error finding members"));
						
						if(members.length)
							return callback(Common.returnOk(res,"Group exist with user",members[0].group));
						
						Membership.create({user:user.id,group:group.id},
								function(err,member){
									if(err)							
										return callback(Common.returnError(res,"Error creating Membership in existing group"));

								 return callback(Common.returnOk(res,"New member added to group",group));
						});
						
						
					});
				}else{
					Group.create({name:params.groupName,created_by:user.name},
						function(err,group) {
							if(err) 
								return callback(Common.returnError(res,"Error creating group"));
							Membership.create({user:user.id,group:group.id},
								function(err,member){
									if(err){
										console.log(err);
										return callback(Common.returnError(res,"Error creating Membership"));
									}
									return callback(Common.returnOk(res,"Group created",group));
								});
					});
				}

			});

		});
	},
	newChat : function(params,callback){
		var res = params.res;

		Membership.find({user:params.userId,group:params.groupId}).populate('group').populate('user').exec(function(err,members){
			if(err)
				return callback(Common.returnError(res,"Error finding members"));

			if(!members.length)
				return callback(Common.returnError(res,"No such user exist in group"));
			
			var group = members[0].group;
			
			if(!group.hasOwnProperty('chats'))
				group.chats = [];
			group.chats.push({username:members[0].user.name,message:params.message,created_at:
				new Date().toISOString()});
			group.save(function(err,response){
				if(err)
					return callback(Common.returnError(res,"Error saving group with message"));
				return callback(Common.returnOk(res,"Saved group",response));
			});
		});
	}
};