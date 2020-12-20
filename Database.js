var USE_DB = true;
var mongojs = USE_DB ? require("mongojs") : null;
var db = USE_DB ? mongojs('localhost:27017/myGame', ['account','progress']) : null;


//account:  {username:string, password:string}
//progress:  {username:string, items:[{id:string,amount:number}]}

Database = {};
Database.isValidPassword = function(data,cb){
	db.account.find({username:data.username,password:data.password},function(err,res){
		if(res.length > 0)
			cb(true);
		else
			cb(false);
	});
}
Database.isUsernameTaken = function(data,cb){
	db.account.find({username:data.username},function(err,res){
		if(res.length > 0)
			cb(true);
		else
			cb(false);
	});
}
Database.addUser = function(data,cb){
	db.account.insert({username:data.username,password:data.password},function(err){
		cb();
	});
}
Database.getPlayerProgress = function(username,cb){
	if(!USE_DB)
		return cb({items:[]});
	// Load the player info from the database.
	// What if it is a new player so no record is found???
	db.progress.findOne({username:username},function(err,res){
		if (res != null){
			cb({items: res.items});
		}
		else {
			console.log ("no Player Progress found!! Initiating new items");
			cb({items:[]})
		}
	});
}
Database.savePlayerProgress = function(data,cb){
	cb = cb || function(){}
	if(!USE_DB)
		return cb();
	db.progress.update({username:data.username},data,{upsert:true},cb);
}