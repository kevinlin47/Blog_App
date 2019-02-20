var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var methodOverride=require("method-override");

//APP config
mongoose.connect("mongodb://localhost:27017/restful_blog_app",{useNewUrlParser:true});
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

//Mongoose/Model Config
var blogSchema=new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog=mongoose.model("Blog",blogSchema);

//RESTful routes

app.get("/", function(req,res){
	res.redirect("/blogs");
});

//INDEX Route
app.get("/blogs", function(req,res){
	Blog.find({}, function(err,blogs){
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.render("index",{blogs:blogs});
		}
	});
});

//NEW Route
app.get("/blogs/new", function(req,res){
	res.render("new");
});

//CREATE Route
app.post("/blogs", function(req,res){
	//create blog
	Blog.create(req.body.blog, function(err, newBlog){
		if(err)
		{
			res.render("new");
		}
		else
		{
			res.redirect("/blogs")
		}
	});
});

//SHOW Route
app.get("/blogs/:id", function(req,res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err)
		{
			res.redirect("/blogs");
		}
		else
		{
			res.render("show",{blog:foundBlog});
		}
	});
});

//EDIT Route
app.get("/blogs/:id/edit", function(req,res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err)
		{
			res.redirect("/blogs");
		}
		else
		{
			res.render("edit",{blog:foundBlog});
		}
	});
});

//UPDATE Route
app.put("/blogs/:id", function(req,res){
	Blog.findByIdAndUpdate(req.params.id,req.body.blog, function(err,updatedBlog){
		if(err)
		{
			res.redirect("/blogs");
		}
		else
		{
			res.redirect("/blogs/"+req.params.id);
		}
	});
});

//DELETE Route
app.delete("/blogs/:id", function(req,res){

});

app.listen(3000,"127.0.0.1", function(){
	console.log("Server is running");
});
