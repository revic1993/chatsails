'use strict';

var request = require('supertest'),
	assert = require('chai').assert;

describe.skip("testing User controller",function(){

		var newUserRequest = {},
			token = "Oz32z2iXO82k7YNos9Fb";
		beforeEach(function(){
			newUserRequest = request(sails.hooks.http.app)
								.post('/user/new')
								.set('Accept','application/json');			
		});

	it("should test session auth policy",function(done){
		newUserRequest.
			send({number:"1213123",name:"nae"}).
			expect(403).
			end(function(err,res){
				if(err) throw err;
				assert.equal(res.body.error,true);
				done();
			});
	});
	it("should fail because of parameters",function(done){
		newUserRequest.
			send({mobile:"1123",user:"asdf",token:token}).
			expect(400).
			end(function(err,res){
				if(err) throw err;
				assert.equal(res.body.error,true);
				assert.equal(res.body.message,"Enter proper credentials");					
				done();
			});
	});

	it("should create new user",function(done){
		newUserRequest.
			send({user:"Dummy",mobile:"1212121212",token:token}).
			expect(200).
			end(function(err,res){
				if(err) throw err;
				assert.equal(res.body.error,false);	
				assert.isObject(res.body.data,"data should be object");	
				console.log(res.body.data);					
				done();
			});
	});

	it("should return existing user",function(done){
		newUserRequest.
			send({user:"Rujul",mobile:"9099918588",token:token}).
			expect(200).
			end(function(err,res){
				if(err) throw err;
				assert.equal(res.body.error,false);	
				assert.isObject(res.body.data,"data should be object");	
				console.log(res.body.data);					
				done();
			});
	});

});

