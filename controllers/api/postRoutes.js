const router = require("express").Router();
const { Post, Comment, User } = require("../../models");
const withAuth = require("../../utils/auth");

//create new post
router.post("/", withAuth, async (req, res) => {
  try {
     const postData = await Post.create({
       title: req.body.title,
       description: req.body.description,
       user_id: req.session.user_id,
     });
     res.status(200).json(postData);
 } catch (err) {
   res.status(400).json(err);
 }
});

//update post
router.put("/:id", withAuth, async(req, res) => {
   try {
    const postData = Post.update(
      {
        title: req.body.title,
        description: req.body.description,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//delete post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  
module.exports = router;