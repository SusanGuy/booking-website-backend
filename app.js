const express=require("express");
const app =express();
const mysql=require ("mysql");
var bodyParser = require('body-parser');
app.use( bodyParser.json());       
app.use(bodyParser.urlencoded({extended: true}));
const connection= mysql.createConnection({
	host:"myapp.chzzw5vv4mkw.us-east-2.rds.amazonaws.com",
	database:"APP",
	user:"ssubedi1",
	password:"MYAPP123"

});

connection.connect(function(err){
if(err){
	console.error("Error connecting:"+err.stack);
	return;

}


console.log("Connected");



});

app.get("/",function(request,response){
	response.send(`
		<!DOCTYPE html>
		<html>
		<body>

		<h1>My First Heading</h1>
		<p>My first paragraph.</p>

		</body>
		</html>

				`);
	console.log("Hello")
});

app.get("/user",function(request,response){
	connection.query("SELECT * FROM Sample_User", function(error,results){
		if(error)
			throw error;
		response.send(results);
	});
});



app.delete("/user/:ID",function(request,response){
	connection.query("DELETE FROM Sample_User where ID= ?",[request.params.ID], function(error,results){
		if(error)
			throw error;
		response.send(results);
	});
});

app.post("/user",function(request,response){
	connection.query("INSERT INTO Sample_User(Name, ID) VALUES(?,?)",[request.body.Name,request.body.ID], function(error,results){
		if(error)
			throw error;

	});
});


app.put("/user",function(request,response){

	connection.query("UPDATE `Sample_User` SET `Name` = ? where `ID` = ?",[request.body.Name, request.body.ID], function(error,results){
		if(error)
			throw error;
		response.send(results);
	});
});





app.listen(3000);

