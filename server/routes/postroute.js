const express = require('express');
const router = express.Router();
const post = require('../models/post');
//create 
router.post("/",async(req,res)=>{
    const newpost = new post(req.body);
    try{
        const savedpost = await newpost.save();
        res.status(200).json(savedpost);
    }catch(err)
    {
        res.status(500).json(err);
    }
});
//update
router.put(":/id", async(req,res)=>{
    const Post = await post.findById(req.params.id);
    if(Post.username === req.body.username)
    {
        try{
            const updatedPost = await post.findByIdAndUpdate(req.params.id,
            {
                $set:req.body,
            },
            {new: true}
            );
            res.status(200).json(updatedPost);
        }
        catch(err){
            res.status(500).json(err);
        }
    }
});
//delete
router.delete(":/id",async(req,res)=>{
    try{
    const Post = await post.findById(req.params.id);
    if(Post.username === req.body.username)
    {
        try{
            await Post.delete();
            res.status(200).json("post deleted");
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(500).json("only your post can be deleted");
    }
}
catch(err){
    res.status(500).json(err);
}
});
//get
router.get(":/id",async(req,res)=>{
    try{
        const Post = await post.findById(req.params.id);
        res.status(200).json(Post);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})
//getting all
router.get(":/id",async(req,res)=>{
    const Username = req.query.User;
    const Catname = req.query.Cat;
    try{
        let posts;
        if(Username)
        {
            posts = await Post.find({Username});
        }
        else if(Catname){
            posts = await post.find({
                categories:{
                    $in:[Catname],
                },
            });
        }
        else{
            posts = await Post.find();
        }
        res.status(200).json(posts);
    }   
    catch(err){
        res.status(500).json(err);
    }
});
module.exports = router;