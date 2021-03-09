const express = require('express');
const router = express.Router();
const userpost = require('../models/profile');

router.get('/', async (req, res) => {
    const posts = await userpost.find();
    res.json(posts);
})

router.get('/:profileid', async (req, res) => {
    const post = await userpost.findById(req.params.profileid)
    res.json(post)
})

router.post('/', async (req, res) => {

    console.log("request....")
    const Post = new userpost({
        name: req.body.name,
        description: req.body.description,
        designation:req.body.designation,
        company:req.body.company
    })
    const Savedpost = await Post.save();
    res.json(Savedpost);

})

router.delete('/:postid',async(req,res)=>{
    const deletedpost= await userpost.remove({_id: req.params.profileid});
    res.json(deletedpost)
})

router.patch('/:postid',async(req,res)=>{
    const updatedpost= await userpost.updateOne({_id:req.params.profileid},{$set:{name:req.body.name}})
    res.json(updatedpost)
})

module.exports = router;