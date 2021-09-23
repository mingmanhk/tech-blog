const router = require('express').Router();
const { Post, User, Dashboard } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", withAuth, async (req, res) => {

  try {
    // Get all projects and JOIN with user data
    const PostData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "content", "created_at"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["name"],
          },
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
    })
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
 
router.get("/edit/:id", async (req, res) => {
  try {
    const postData = await Post.findOne(req.params.id, {
      where: {
        id: req.params.id,
      },
      attributes: ["id", "content", "title", "created_at"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["name"],
          },
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const posts = postData.get({ plain: true });

    res.render("edit-post", {
      ...posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/new", (req, res) => {
  res.render("new-post");
});

module.exports = router;
