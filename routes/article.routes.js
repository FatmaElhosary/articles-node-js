const express = require("express");
const router = express.Router();
const mysql=require('../database/db');


 router.get('/article/:id',async(req,res)=>{
    await mysql.execute(`SELECT title,description FROM articles WHERE id=?`,[req.params.id]).then(([articles])=>{
        //console.log(articles);
        res.render('article',{articles,admin:false});

    })
}) 
router.post('/searcharticles',async(req,res)=>{
    console.log(req.body.title);
     await mysql.execute(`SELECT id,title,SUBSTRING_INDEX( description , ' ', 10) AS description  FROM articles WHERE title LIKE '%${req.body.title}%'`).then(([articles])=>{
        console.log(articles);
      res.render('index',{articles,admin:false});
    }) 
})

router.get('/',async(req,res)=>{
    await mysql.execute(`SELECT id,title,SUBSTRING_INDEX( description , ' ', 10) AS description FROM articles`).then(([articles])=>{
        //console.log(articles);
        res.render('index',{articles,admin:false});

    })
})
module.exports=router;