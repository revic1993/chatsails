'use strict';

var request = require('supertest'),
	assert = require('chai').assert,
	token = "Oz32z2iXO82k7YNos9Fb";	
	// User = require('../../api/models/User');
describe("testing Group controller",function(){
	describe("testing new group route",function(){
		
		this.timeout(15000);
		var newGroupRequest = {};			
		beforeEach(function(){
			newGroupRequest = request(sails.hooks.http.app)
								.post('/group/new')
								.set('Accept','application/json');			
		});

		it("should check for session auth",function(done){
			
			newGroupRequest.
				send({params:"nothing"}).
				expect(403).
				end(function(err,res){
					assert.equal(res.body.error,true);
					assert.isString(res.body.message,"message is string");			
					done();
				});
		});
		it("should check for parameters",function(done){
			
			newGroupRequest.
				send({token:token}).
				expect(400).
				end(function(err,res){
					assert.equal(res.body.error,true);
					assert.isString(res.body.message);					
					done();
				});
		});
		it("should create new group",function(done){
				
				newGroupRequest.
					send({token:token,groupName:"H3R3",name:"Rujul",mobile:'9099918588'}).
					expect(200).
					end(function(err,res){
						assert.equal(res.body.error,false);
						assert.isString(res.body.message);
						assert.isObject(res.body.data);						
						// console.log(res.body.message);
						done();
					});
				
		});

		it.skip("should attach new user to existing group",function(done){
			newGroupRequest.
				send({token:token,groupName:"General",name:"Rujul",mobile:'9099918588'}).
				expect(200).
				end(function(err,res){
					assert.equal(res.body.error,false);
					assert.isString(res.body.message);
					assert.isObject(res.body.data);					
					done();
				});
		});
	});
	
	describe.skip("testing new chat route",function(){
		var newChatRequest = {};
		beforeEach(function(){
			newChatRequest = request(sails.hooks.http.app)
								.post('/group/add/chat')
								.set('Accept','application/json');			
		});


		it("should test the chat route",function(done){
			newChatRequest.
				send({params:"nothing"}).
				expect(403).
				end(function(err,res){
					assert.equal(res.body.error,true);
					assert.isString(res.body.message,"message is string");			
					done();
				});
		});

		it("should check the response value",function(done){
			newChatRequest.
				send({groupId:"569f4f71f17b81d8144df1a1",userId:"569dfa862e8d37241bb2b2dc",
					message:"hello",
					token:token}).
				expect(200).
				end(function(err,res){				
					console.log(res.body.message);				
					done();
				});
		});
	});

});