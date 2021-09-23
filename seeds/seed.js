const sequelize = require('../config/connection');
const { User, Post, Comment } = require("../models");

const userData = require('./userData.json');
const commentData = require("./commentData.json");
const postData = require("./postData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const posts=[];
  for (const post of postData) {
    posts.push(await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    }))
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      post_id: posts[Math.floor(Math.random() * posts.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
