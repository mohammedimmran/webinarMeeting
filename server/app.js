const express = require("express");
const app = express();
const PORT=5000;


const mongoose = require("mongoose");
const {MONGOURI} = require("./keys");

mongoose.connect(MONGOURI , {
    useNewUrlParser:true,
    useUnifiedTopology: true,

})
mongoose.connection.on("connected" ,()=>{
    console.log("Conneted to mongoDB");
})
mongoose.connection.on("error" ,(err)=>{
    console.log("Error");
})

require("./models/user")
require("./models/post")

// mongoose.model("user")
app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/post"))


// This is executed first before responding the requested page
/**const customMiddleware = (req ,res ,next)=>{
    console.log("Middleware is executed before the reuest has to be given to the user if YES then the next request is ecxecuted");
    next();
}**/

// if we use app.use(middleware) it will be applied to all the request 
// app.use(customMiddleware);

/*
app.get("/",(req , res)=>{
    console.log("Home")
    res.send("Hello world");
})
// now i want to use middleware only for the about page then ,
app.get("/about",customMiddleware,(req , res)=>{
    console.log("This is about page")
    res.send("This is about page");
})
*/
app.listen(PORT , ()=>{
    console.log(`Server is running  on ${PORT}`);
})