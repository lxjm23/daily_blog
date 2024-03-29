//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash")
const mongoose = require("mongoose")

//data base connection
mongoose.connect("mongodb+srv://ljm12543:Jmlopez2001@cluster0.szsdpic.mongodb.net/Posts",
{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

//database schema
const postsSchema ={
  title : {
    type: String,
    required : true
  },
  content : {
    type: String,
    required : true
  }
}

//data base model
const Post = mongoose.model("Post" , postsSchema)

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){
                        // key: value
                        // renders common stuff dynamically
  Post.find({}, function(err, posts){
    res.render("home", 
    {startingContent: homeStartingContent,
     posts: posts
    })
  })
})

app.get("/contact", function(req, res){
  res.render("contact", {contactPageContent: contactContent})
})

app.get("/about", function(req, res){
  res.render("about", {aboutPageContent: aboutContent})
})

app.get("/compose", function(req,res){
  res.render("compose")
})

app.post("/compose", function(req, res){
  const post = new Post({
    title : req.body.postTitle,
    content : req.body.postBody
  })
    

  post.save(function(err){
    if(!err) return res.redirect("/")
  });
  
  
})

// console logs the parameter entered from the browser
// app.get("/posts/:postName", function(req, res){
//   console.log(req.params.postName)
// })

//checks if the parameters is valid
//
app.get("/posts/:postId", function(req, res){
  //const requestedTitle = lodash.lowerCase(req.params.postName);
  const requestedPostId = req.params.postId
  
  Post.findById({_id : requestedPostId}, function(err, post){
    if (!err) return (res.render("post",{
      title : post.title,
      content : post.content
    }))
  })

  // posts.forEach(post => {
  //   const storedTitle = lodash.lowerCase(post.title);
    
    
  //   if(storedTitle === requestedTitle){
  //     //console.log("Matched Found")

  //     //renders the page if match is found
  //     res.render("post",{
  //       title: post.title,
  //       content: post.content

  //     })
  //   }
  //   else{
  //     console.log("Failed")
  //   }
  // });
})










app.listen(3000, function() {
  console.log("Server started on port 3000");
});
