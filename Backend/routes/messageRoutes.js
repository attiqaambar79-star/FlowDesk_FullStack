const router=require("express").Router();
const mongoose=require("mongoose");
const Message=mongoose.model("Message",new mongoose.Schema({name:String,email:String,subject:String,message:String},{timestamps:true}));
router.post("/",async(req,res)=>{
 try{const {name,email,subject,message}=req.body;if(!name||!email||!message)return res.status(400).json({message:"Please complete required fields"});await Message.create({name,email,subject,message});res.status(201).json({message:"Your message has been sent"});}
 catch(e){res.status(500).json({message:e.message});}
});
module.exports=router;
