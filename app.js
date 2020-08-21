const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer=require('multer');
const bodyParser = require("body-parser").urlencoded({ extended: true });
const path = require("path");
const articleRoutes = require("./routes/article.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const validation = require("validator");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "assets")));
app.use("/media", express.static(path.join(__dirname, "media")));
let storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'media');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname);
    }
});
app.use(multer({dest:'media',storage}).single('cardimg'))


app.use(bodyParser);



app.use(articleRoutes);
app.use(dashboardRoutes);
mongoose.connect("mongodb://localhost:27017/articles", { useNewUrlParser: true , useUnifiedTopology: true });

app.listen(process.env.PORT||3000, () => {
  console.log("server running");
});
