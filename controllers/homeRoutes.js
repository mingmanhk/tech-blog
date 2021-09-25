const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

//show all the post
router.get("/", async (req, res) => {
  try {
    const PostData = await Post.findAll({
      attributes: ["id", "title", "description", "created_at"],
      order: [["created_at", "DESC"]],
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
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//show post and comments
router.get("/post/:id", async (req, res) => {
  try {
    console.log("start", req.session.user_id);
    const postData = await Post.findByPk(req.params.id, {
      attributes: ["id", "title", "description", "user_id", "created_at"],
      order: [["created_at", "DESC"]],
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
    const post = postData.get({ plain: true });
    res.render("post", {
      post,
      logged_in: req.session.logged_in,
      self_checker: post.user_id==req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

router.get("/create-post", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  res.render("create-post");
});

module.exports = router;
