const express = require("express");
const dashbordRouter = express.Router();
const mysql=require('../database/db');
const validation  =  require("validator");
dashbordRouter.get('/add-article',(req,res)=>{
    res.render('add-article',{admin:true});
    })
 
dashbordRouter.get('/dashboard',(req,res)=>{
    mysql.execute(`SELECT id,title,SUBSTRING_INDEX( description , ' ', 10) AS description FROM articles`).then(([articles])=>{
        res.render('dashboard',{articles,admin:true});

    })
})
//must be post save in DB
dashbordRouter.post('/addarticle',async(req,res)=>{
    // console.log(req.body);
       if(req.body.title.trim() !="" && req.body.description.trim()!="" && validation.matches(req.body.title.trim(),/[a-z A-Z \s \w]+/)){
         await  mysql.execute(`INSERT INTO articles (title, description) VALUES ('${req.body.title.trim()}','${req.body.description.trim()}')`);
       
         res.redirect('/dashboard');
     }
     else{
         
       console.log('Please Fill Empty Data or write only alphabets ');
       res.send('Please Fill Empty Data or write only alphabets ');
     }
 })   
dashbordRouter.get('/dashboard/article/:id',async(req,res)=>{
    await mysql.execute(`SELECT id,title,description FROM articles WHERE id=?`,[req.params.id]).then(([articles])=>{
        //console.log(articles);
        res.render('article',{articles,admin:true});

    })
}) 


dashbordRouter.get('/deletearticle/:id',async(req,res)=>{
  
    await mysql.execute(`DELETE  FROM articles WHERE id = ?`,[req.params.id]);
      res.redirect('/dashboard')
});
dashbordRouter.get('/editarticle/:id',async(req,res)=>{
    
   await mysql.execute(`SELECT * FROM  articles WHERE id = ?`,[req.params.id]).then(([result])=>{
    res.render('edit-article',{result,admin:true});
   });
  
});

dashbordRouter.post('/editarticleform/:id',async(req,res)=>{ 
   // console.log(req.body);
       await mysql.execute(`UPDATE  articles SET title=?, description =? WHERE id =?`,[req.body.title,req.body.description,req.params.id]);
        res.redirect('/dashboard') 
});
dashbordRouter.post('/dashboard/searcharticles',async(req,res)=>{ 
    await mysql.execute(`SELECT id,title,SUBSTRING_INDEX( description , ' ', 10) AS description  FROM articles WHERE title LIKE '%${req.body.title}%'`).then(([articles])=>{
        console.log(articles);
      res.render('dashboard',{articles,admin:true});
    }) 
 });
 

module.exports=dashbordRouter;