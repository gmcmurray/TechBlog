const sequelize = require('../config/connection');
const { User, BlogPost, Comments } = require('../models');

const userData = require('./userData.json');
const blogs = require('./blogs.json')
const comments = require('./comments.json')
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await BlogPost.bulkCreate(blogs, {
    returning: true,
  });

  await Comments.bulkCreate(comments, {
    returning: true,
  });
  process.exit(0);
};

seedDatabase();
