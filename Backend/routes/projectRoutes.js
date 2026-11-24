const router=require("express").Router();
const Project=require("../models/Project");
const auth=require("../middleware/auth");
router.use(auth);
router.get("/",async(req,res)=>{try{res.json(await Project.find({owner:req.user.id}).sort({createdAt:-1}));}catch(e){res.status(500).json({message:e.message});}});
router.post("/",async(req,res)=>{try{const p=await Project.create({...req.body,owner:req.user.id});res.status(201).json(p);}catch(e){res.status(400).json({message:e.message});}});
router.put("/:id",async(req,res)=>{try{const p=await Project.findOneAndUpdate({_id:req.params.id,owner:req.user.id},req.body,{new:true,runValidators:true});if(!p)return res.status(404).json({message:"Project not found"});res.json(p);}catch(e){res.status(400).json({message:e.message});}});
router.delete("/:id",async(req,res)=>{try{const p=await Project.findOneAndDelete({_id:req.params.id,owner:req.user.id});if(!p)return res.status(404).json({message:"Project not found"});res.json({message:"Project deleted"});}catch(e){res.status(500).json({message:e.message});}});
module.exports=router;
