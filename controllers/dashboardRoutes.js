const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

//show all the post
router.get("/", withAuth, async (req, res) => {
  try {
    const PostData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      order: [["created_at", "DESC"]],
      attributes: ["id", "title", "description", "created_at"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["name"],
          },
          order: [["created_at", "DESC"]],
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    // Serialize data so the template can read it
    const posts = PostData.map((post) => post.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render("dashboard", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
