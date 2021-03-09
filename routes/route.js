const express = require("express");
const router = express.Router();
const userpost = require("../models/profile");
const redis = require("redis");
const client = redis.createClient(6379);

router.get("/", async (req, res) => {
  const profilesRedisKey = "profiles";
  return client.get(profilesRedisKey, async (err, profiles) => {
    if (profiles) {
      return res.json({ source: "cache", data: JSON.parse(profiles) });
    } else {
      const posts = await userpost.find();
      client.setex(profilesRedisKey, 3600, JSON.stringify(posts));
      res.json(posts);
    }
  });
});

router.post("/", async (req, res) => {
  console.log("request....");
  const Post = new userpost({
    name: req.body.name,
    description: req.body.description,
    designation: req.body.designation,
    company: req.body.company,
  });
  const Savedpost = await Post.save();
  res.json(Savedpost);
});

router.delete("/:postid", async (req, res) => {
  const deletedpost = await userpost.remove({ _id: req.params.profileid });
  res.json(deletedpost);
});

router.patch("/:postid", async (req, res) => {
  const updatedpost = await userpost.updateOne(
    { _id: req.params.profileid },
    { $set: { name: req.body.name } }
  );
  res.json(updatedpost);
});

module.exports = router;
