const express = require('express');
const Router  = express.Router();
const homeSchema = require('../models/homeSchema');

Router.get('/',(err,res)=>{
    res.render('register',{title :'Please use the form to create account',password:'',email:''})
})

// REGISTER
Router.post('/register',async(req,res)=>{
   try{
       const {
           name,
           number,
           email,
           password,
           cpassword
       } = req.body;

    if(password === cpassword ){
       
         const userData = new homeSchema({
            name,
            number,
            email,
            password
         })
         userData.save(err=>{
             if(err){
                console.log("Registered")
             }else{
                res.render('register',{title :'Done',password:'',email:''})
             }
         })
       
    const useremail = await homeSchema.findOne({email:email});
     if(email === useremail.email){
        res.render('register',{title :'',password:'',email:'Email is already registered.'})
     }else{
         console.log('err')
     }

    }else{
        res.render('register',{title :'',password:'Passwords do not match',email:''})
    }
   }catch(error){

    res.render('register',{title :'Registered!',password:'',email:''})
   }
})

// 

// SIGNIN

Router.post('/login',(req,res)=>{
    
    const {
        email,
        password    
    } = req.body;

    homeSchema.findOne({email:email},(err,result)=>{
        
        if(email === result.email && password === result.password){
            res.render('dashbord', {email : result.email})
        }else{
            console.log(err)

        }
    })
})

// 

// SIGNOUT

Router.get('/logout', (req, res)=> {
    req.destroy(function(err) {
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('resister', {title :'Logout Successfully',password:'',email:''})
        }
    })
})

module.exports = Router;