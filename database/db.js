const mongosse=require('mongoose')


const indexSchema=new mongosse.Schema({
    title:String,
    imgURL:String,
    description:String
});


const DBModel=mongosse.model('article',indexSchema);

module.exports=DBModel;