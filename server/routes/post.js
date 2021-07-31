const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")

router.get("/allpost" ,requireLogin, (req, res)=>{
    Post.find().populate("postedBy" ,"_id name" ).then(posts=>{
        res.json({posts})
    }).catch(err=>{
        console.log(err)
    })
})

router.post("/createpost" ,requireLogin , (req, res)=>{
    const {title , body , pic } = req.body
    // console.log(req.body , req.user)
    // console.log(title , body , pic)n 

    if(!title || !body || !pic){
        return res.status(422).json({error:"Plz add all the fields"})
    }
    req.user.password =undefined;
    const post = new Post({
        title:title,
        body:body,
        photo:pic,
        postedBy:req.user
    })

    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
            console.log(err)
    })
   
})

router.get("/mypost",requireLogin ,(req, res)=>{
    // populate is used to slect only particular fields
    Post.find({postedBy:req.user._id}).populate("PostedBy" , "_id name").then(mypost=>{
        res.json({mypost:mypost})
    }).catch(err=>{
        console.log(err)
    })
})


module.exports = router