const mysql=require('mysql2');


const query=mysql.connect({
    host:'localhost',
    database:'articles',
    user:'root',
    password:''
});

module.exports=query.promise();