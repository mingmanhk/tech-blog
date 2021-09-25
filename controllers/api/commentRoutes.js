const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//create new post
router.post("/", async (req, res) => {
   console.log("create comment")
  try {
    console.log("create user_id", req.session.user_id);
    console.log("create comment", req.body.comment);
     console.log("create post_id", req.body.post_id);
    const user_id = () => { if (req.session.user_id) { req.session.user_id } else { 4 } };
     console.log("create user_id", user_id);
    console.log("create comment", user_id);
    // if (req.session) {
      const commentData = await Comment.create({
        comment: req.body.comment,
        user_id: req.session.user_id,
        post_id: req.body.post_id,
      });
    // } else {
    //   const commentData = await Comment.create({
    //     comment: req.body.comment,
    //   });
    // }
    console.log(commentData);
    res.status(200).json(commentData);
 } catch (err) {
   res.status(400).json(err);
 }
});

module.exports = router;