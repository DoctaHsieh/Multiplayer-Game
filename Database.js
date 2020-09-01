var USE_DB = true;
var mongojs = require("mongojs") : null;
var db = USE_DB ? mongojs('localhost:27017/myGame', ['account','progress']) : null;

Database = {};
Database.isValidPassword = function(data,cb){
	if(!USE_DB)
	    return cb(true);
	db.account.find({username:data.username,password:data.password},function(err,res){
		if(res)
			cb(true);
		else
			cb(false);
	});
}
Database.isUsernameTaken = function(data,cb){
	if(!USE_DB)
	    return cb(false);
	db.account.findOne({username:data.username},function(err,res){
		if(res)
			cb(true);
		else
			cb(false);
	});
}
Database.addUser = function(data,cb){
	if(!USE_DB)
	    return cb();
	db.account.insert({username:data.username,password:data.password},function(err){
		Database.savePlayerProgress({username:data.username, items:[]}, function(){
		    cb();
		})
	});
}
Database.getPlayerProgress = function(username,cb){
	if(!USE_DB)
	    return cb({items:items[]});
	db.progress.findOne({username:username},function(err){
		cb({items:res.items});
	});
}
Database.savePlayerProgress = function(data,cb){
    cb = cb || function(){
    }
	if(!USE_DB)
	    return cb();
	db.progress.update({username:data.username},data,{upsert:true},cb);
}