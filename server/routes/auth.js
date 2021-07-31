const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {JWT_SECRET}=require("../keys")
const requireLogin = require('../middleware/requireLogin')


/*router.get("/protected" , requireLogin ,  (req,res)=>{

    res.send("Hello user");
})*/


router.get("/" , (req , res)=>{
    res.send("Hello");
})

router.post("/signup" , (req , res)=>{
    const {name , email , password} = req.body;

    if(!email || !password)
    {
        // we are checking here whether all the fields are given by the user if not change the status code to 422
        // and give the error
        return res.status(422).json({error:"Please add all the fields"})
        
    }
    /*res.json({message:"Successfully added"});
    console.log(req.body.name)
    console.log(req.body.email)
    console.log(req.body.password)*/

    User.findOne({email:email}).then((savedUser)=>{
        
        if(savedUser){
            return res.status(422).json({error:"Email Already exist"})
        }

        bcrypt.hash(password,12).then(hashedpassowrd=>{
            const user = new User({
                email:email,
                name:name,
                password:hashedpassowrd
            })
    
            user.save().then(user=>{
                res.json({message:"Saved Successfully"});
            }).catch(err=>{
                console.log(err);
            })

        })
       
    }).catch(err=>
        {console.log(err)}
    )
})

router.post("/signin" , (req , res)=>{
    const {email , password} = req.body;
    if(!email || !password){
        return res.status(422).json({error:"Invalid Details"});
    }
    User.findOne({email:email}).then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid email"})
        }
        bcrypt.compare(password , savedUser.password).then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfulee signin"})
                const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id , name , email } = savedUser;
                res.json({token ,user: {_id , name , email}})
            }else{
                return res.status(422).json({error:"Invalid password"})
            }
        }).catch(err=>{
            console.log(err);
        })
    })
})



module.exports = router;