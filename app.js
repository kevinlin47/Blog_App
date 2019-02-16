var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/restful_blog_app",{useNewUrlParser:true});
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//Mongoose/Model Config
var blogSchema=new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog=mongoose.model("Blog",blogSchema);

Blog.create({
	title: "Test Blog",
	image: "C:\\Users\\Kevin\\Pictures\\Saved Pictures\\IMG_20180804_133946_221",
	body: "Hello this is a blog post"
});

//RESTful routes

app.listen(3000,"127.0.0.1", function(){
	console.log("Server is running");
});
