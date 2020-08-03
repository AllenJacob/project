const express = require('express');
const Productdata = require('./src/model/Productdata');
const Signupdata = require('./src/model/Signupdata');
const cors = require('cors');
var bodyparser=require('body-parser');
var app=new express();
app.use(cors());
app.use(bodyparser.json())
app.get('/products',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    Productdata.find()
                   .then(function(products){
                       res.send(products);
                   });
});
app.post('/insert',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    console.log(req.body);
    var product = {
        productId : req.body.product.productId,
        productName : req.body.product.productName,
        productCode : req.body.product.productCode,
        releaseDate : req.body.product.releaseDate,
        description : req.body.product.description,
        price : req.body.product.price,
        starRating : req.body.product.starRating,
        imageUrl : req.body.product.imageUrl,
    }
    var product = new Productdata(product);
    product.save();
})  
app.post('/signup',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    console.log(req.body);
    var signup = {
        
        email : req.body.signup.email,
        password : req.body.signup.password

    }
    var signup = new Signupdata(signup);
    signup.save();

})
app.post('/delete',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    id= req.body.pid;
    console.log(id)
    Productdata.deleteOne({_id:id},function(err,result){
        if(result){
            console.log("deleted")
        }
    })
})
app.post('/cart',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    id = req.body.id;
    console.log(id)
    Productdata.findOne({_id:id},function(err,result){
        if(result){
            console.log("product")
        }
    })
})

app.post('/login',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    email=req.body.email;
    password=req.body.password;
    Signupdata.findOne({ $and : [{'email' : email},{'password' : password}]})

    .then(function(user){
        if(user){
            console.log("login"+user)
            
        }
        else{
            res.send("invalid credentials")
            console.log("invald"+user)
        }

    })
})
app.listen(3000, function(){
    console.log('listening to port 3000');
    

});
