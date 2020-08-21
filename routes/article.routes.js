const express = require("express");
const router = express.Router();
const DBModel=require('../database/db');


 router.get('/article/:id',async(req,res)=>{

    const articles= await DBModel.findById(req.params.id);
        console.log(articles);
        res.render('article',{articles,admin:false});

    
});
router.post('/searcharticles',async(req,res)=>{
/* const articles=await DBModel.find( { $text: { $search: req.body.title } } );
      res.render('index',{articles,admin:false}); */
   
});

router.get('/',async(req,res)=>{
    const  articles=  await DBModel.find();
    console.log(articles);
     res.render('index',{articles,admin:false});

});
module.exports=router;