/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	schema:true,
	attributes : {
		name:{
			type:"string",
			minLength:3
		},
		mobile:{
			type:"integer",
			required:true,
			maxLength:10,
			minLength:10
		},
		membership:{
			collection:'Membership',
			via:'user',			
		}
	},
	toJSON:function(){
			var obj = this.toObject();
			delete obj.createdAt;
			delete obj.updatedAt;
			return obj;
	}
};

