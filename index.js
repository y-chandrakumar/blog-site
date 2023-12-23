import bodyParser from "body-parser";
import express, { query } from "express";
import fs from "fs";
const app=express();



//reading data from file 
const readDataFromFile = (filename) => {
    try {
      const data = fs.readFileSync(filename, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  };


//creating object and updating the file 
  const createObject = (newObject,filename) => {
    const existingData = readDataFromFile("blogs.json");
    existingData.push(newObject);
    fs.writeFileSync(filename, JSON.stringify(existingData, null, 2));
  };



app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


 
app.get("/signup",(req,res)=>{
  res.render("signup.ejs");
})


app.post("/verifyemail",(req,res)=>{
  var data=req.body;
  var userdetails={username:data.name,email:data.email,password:data.password}
  
})


app.get("/" ,(req,res)=>{
    const blogs=readDataFromFile("blogs.json");
    res.render("home.ejs" ,{blogdata: blogs});
})



app.get("/login" ,(req,res)=>{
    res.render("login.ejs");
})


app.get("/form",(req,res)=>{
    res.render("form.ejs");
})


app.get("/blog",(req,res)=>{

    
    const id = req.query.id;
    
     const blogs=readDataFromFile("blogs.json");

   
    const postId = parseInt(id, 10);
    
    const blogPost = blogs.find(post => post.id === postId);
    if (blogPost) {
        res.render("blog.ejs",{blogdata:blogPost})
    }
    else{
    res.send("some error occured ");}
})



app.post("/submit",(req,res)=>{

    console.log("got something");
    console.log(req.body);
   
    const blogst=readDataFromFile("blogs.json");
    var temppost={id:blogst.length+1,authorid:req.body.email,title:req.body.title,preview:req.body.preview,content:req.body.text,date:req.body.date};
    createObject(temppost,"blogs.json");
    
    const blogs=readDataFromFile("blogs.json");
    

    res.render("home.ejs",{blogdata: blogs,alert:"succesfully posted"});
})


app.get("/construction",(req,res)=>{
  res.render("construction.ejs");
})

app.post("/construction",(req,res)=>{
  res.render("construction.ejs");
})


app.get("/yourblog",(req,res)=>{
    res.render("yourblogs.ejs");
})

app.post("/myblogs",(req,res)=>{
   const authorid=req.body.email;

   const blogs=readDataFromFile("blogs.json");
   const filteredData = authorid ? blogs.filter(item => item.authorid === authorid) : blogs;
   
    
    res.render("yourblogs.ejs",{blogdata: filteredData, author : req.body.email})
})



app.listen(3000,()=>{
    console.log("port is listening");
})





