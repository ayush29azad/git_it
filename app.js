const express = require("express");
const path = require('path');
const port = 9000;
const db = require('./config/mongoose');
const List = require('./models/schema');
const app = express();

app.set('views engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var dolist = [
{

des:"codechef",
cat:"Personal",
date:"12/25/2020"

},
{
des:"codeforces",
cat:"Work",
date:"12/25/2020"

}
]

app.get("/",function(req,res)
{
  
List.find({},function(err,lists){
   if(err)
    {
        console.log("error in fetching list from  database");
        return ;
    }
return res.render('list.ejs',{

do_list:lists
});

});
});


app.post('/push',function(req,res)
{
List.create({
des:req.body.des,
cat:req.body.cat,
date:req.body.date

}, function(err,newList){

    if(err)
    {
        console.log("error in creating database");
        return ;
    }

    console.log("********",newList);
    return res.redirect('back');
});



});

app.get('/delete-todo',(req,res)=>{
    let id = req.query.id;
    console.log(id);
    List.deleteMany({_id:{$in:id}},(err,list)=>{
        if(err){
            console.log("Error in deleting a task");
            return;
        }
        return res.redirect('back');
    })
});
app.listen(9000,function()
{
console.log("listening to port:9000");

});






