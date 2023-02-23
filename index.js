const express = require('express')
const { connections } = require('./config/db')
const { UserModel } = require('./models/user.model')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { flightRoutes } = require('./routes/flight.route')
const {BookingModel} =require('./models/booking.model')
const app=express()


app.use(express.json())



app.get("/",(req,res,next) => {
    res.send("hellow")
})
app.use('/api',flightRoutes)

app.post("/api/register",async(req,res,next)=>{
const {email,name,password}=req.body

const userPresent=await UserModel.findOne({email})
if(userPresent){
    res.send("User already exist ,Please Log In")
}else {
    try {
        bcrypt.hash(password, 4,async(err,hash)=>{
            if(err){
                console.log(err)
            }else{
                const user=new UserModel({email,name,password:hash})
                await user.save()
                res.send("Signup successfully")
            }
        })
    } catch (error) {
        console.log(error)
        console.log("Error in Signup")
    }
}
})

app.post("/api/login",async(req,res,)=>{
    const {email,password}=req.body
    try {
        const user=await UserModel.find({email})
        if(user.length>0){
            const hashed_pass=user[0].password
            bcrypt.compare(password,hashed_pass,(err,result)=>{
                if(result){
                    const token=jwt.sign({userID:user[0]._id },"private")
                    res.send({msg:"Login successfully",token:token})
                }else{
                    res.send("Login Failed")
                }
            })
        }else{
            res.send("Login Failed")
        }
    } catch (err) {
        console.log(err)
        res.send("Something went wrong")
    }
})


// app.get("/booking", async (req, res, next) => {
//     // const token = req.headers.authorization;
//     // jwt.verify(token, "private", async (err, decode) => {
//       // if (err) {
//       //   res.send("Please login first");
//       // } else if (decode) {
//         // const postID = decode.userID;
//         let posts = await FlightModel.find();
//         res.send({ data: posts });
//       // }
//     // });
//   });
  
  app.post("/api/dashboard", async (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
    jwt.verify(token, "private", async (err, decode) => {
      if (err) {
        res.send("Please login again");
      } else if (decode) {
         const userID = decode.userID;
        const flightID = req.body;
        const payload = {user:{type:userID},flight:{type:filghtID}}
        const new_post = new BookingModel(payload);
        await new_post.save();
        res.send({ msg: "flight created successfully" });
      }
    });
  });





app.listen(8080,async(req,res,next)=>{
    try {
        await connections;
        console.log("Connected to db successfully")
    } catch (error) {
        console.log("Failed to connect to")
        console.log(error)
    }
    console.log("Listening on port 8080")
})