const router = require("express").Router();
const { Post, Comment, User } = require("../../models");
const withAuth = require("../../utils/auth");

//create new post
router.post("/", withAuth, async (req, res) => {
  try {
   console.log("create user")
     const postData = await Post.create({
       title: req.body.title,
       description: req.body.description,
       user_id: req.session.user_id,
     });
      console.log(postData);
     res.status(200).json(postData);
 } catch (err) {
   res.status(400).json(err);
 }
});

module.exports = router;