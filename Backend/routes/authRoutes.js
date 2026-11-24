const router=require("express").Router();
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const User=require("../models/User");
const auth=require("../middleware/auth");
const secret=()=>process.env.JWT_SECRET||"development_secret_change_me";
router.post("/register",async(req,res)=>{
 try{
  const {name,email,password}=req.body;
  if(!name||!email||!password) return res.status(400).json({message:"Name, email and password are required"});
  if(password.length<6) return res.status(400).json({message:"Password must be at least 6 characters"});
  if(await User.findOne({email})) return res.status(409).json({message:"Email already registered"});
  const user=await User.create({name,email,password:await bcrypt.hash(password,10)});
  const token=jwt.sign({id:user._id},secret(),{expiresIn:"7d"});
  res.status(201).json({token,user:{id:user._id,name:user.name,email:user.email}});
 }catch(e){res.status(500).json({message:"Registration failed",error:e.message});}
});
router.post("/login",async(req,res)=>{
 try{
  const {email,password}=req.body;
  const user=await User.findOne({email});
  if(!user||!(await bcrypt.compare(password||"",user.password))) return res.status(401).json({message:"Incorrect email or password"});
  const token=jwt.sign({id:user._id},secret(),{expiresIn:"7d"});
  res.json({token,user:{id:user._id,name:user.name,email:user.email}});
 }catch(e){res.status(500).json({message:"Login failed",error:e.message});}
});
router.get("/me",auth,async(req,res)=>{
 const user=await User.findById(req.user.id).select("-password");
 if(!user) return res.status(404).json({message:"User not found"});
 res.json({user});
});
module.exports=router;
