const router=require("express").Router();
const Task=require("../models/Task");
const auth=require("../middleware/auth");
router.use(auth);
router.get("/",async(req,res)=>{try{res.json(await Task.find({owner:req.user.id}).populate("project","name").sort({createdAt:-1}));}catch(e){res.status(500).json({message:e.message});}});
router.post("/",async(req,res)=>{try{res.status(201).json(await Task.create({...req.body,owner:req.user.id}));}catch(e){res.status(400).json({message:e.message});}});
router.put("/:id",async(req,res)=>{try{const t=await Task.findOneAndUpdate({_id:req.params.id,owner:req.user.id},req.body,{new:true,runValidators:true});if(!t)return res.status(404).json({message:"Task not found"});res.json(t);}catch(e){res.status(400).json({message:e.message});}});
router.delete("/:id",async(req,res)=>{try{const t=await Task.findOneAndDelete({_id:req.params.id,owner:req.user.id});if(!t)return res.status(404).json({message:"Task not found"});res.json({message:"Task deleted"});}catch(e){res.status(500).json({message:e.message});}});
module.exports=router;
