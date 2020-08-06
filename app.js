const express=require('express');
const app=express();
const bodyParser=require('body-parser').urlencoded({extended:true});
const path=require('path');
const articleRoutes=require('./routes/article.routes');
const dashboardRoutes=require('./routes/dashboard.routes');
const validation  =  require("validator");
app.use(bodyParser);


app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'assets')));


app.use(articleRoutes);
app.use(dashboardRoutes);
app.listen(3000,()=>{
    console.log('server running');
})