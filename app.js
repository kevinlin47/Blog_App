var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/restful_blog_app",{useNewUrlParser:true});
app.set("view enginer","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000,"127.0.0.1", function(){
	console.log("Server is running");
});
