const express = require("express");
const dashbordRouter = express.Router();
const DBModel = require("../database/db");
const validation = require("validator");
dashbordRouter.get("/add-article", (req, res) => {
  res.render("add-article", { admin: true });
});
 dashbordRouter.get("/dashboard", async(req, res) => {
      const articles=await DBModel.find();
      res.render("index", { articles, admin: true });

}); 
//must be post save in DB
dashbordRouter.post("/addarticle", async (req, res) => {
  if (
    !req.body.title ||
    !req.body.description ||
     req.file==undefined
  ) {
    return res.status(400).send({  
        message: "required fileds",
    });
  }   
    await DBModel.insertMany({
      title: req.body.title,
      description: req.body.description,
      imgURL: req.file.path,
    }).then(data=>{
      res.redirect("/dashboard");
    }).catch((error) => console.log(error));
});
 dashbordRouter.get("/dashboard/article/:id", async (req, res) => {
  const articles= await DBModel.findById(req.params.id);
      //console.log(articles);
      res.render("article", { articles, admin: true });

}); 

 dashbordRouter.get("/deletearticle/:id", async (req, res) => {
  await DBModel.findByIdAndDelete(req.params.id);
  res.redirect("/dashboard");
});

dashbordRouter.get("/editarticle/:id", async (req, res) => {
 const result= await DBModel.findOne({_id:req.params.id});
      res.render("edit-article", { result, admin: true });
   
})

 dashbordRouter.post('/editarticleform/:id',async(req,res)=>{ 
  if (
    !req.body.title ||
    !req.body.description 
  ) {
    return res.status(400).send({  
        message: "required fileds",
    });
  } 
       await DBModel.findByIdAndUpdate( { _id: req.params.id },{
         title:req.body.title,
         description:req.body.description,
         imgURL:req.file.path,
       },{ useFindAndModify: false });
       res.redirect('/dashboard') 
});

dashbordRouter.post('/dashboard/searcharticles',async(req,res)=>{ 
  /*  let articles=await DBModel.find({title: /^req.body.title/});
      res.render('dashboard',{articles,admin:true}); */
  
 });
  

module.exports = dashbordRouter;
