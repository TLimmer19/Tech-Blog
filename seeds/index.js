const sequelize = require('../config/connection');
const seedBlog = require('./BlogData');
const seedComment = require('./CommentData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedBlog();

  await seedComment();

  process.exit(0);
};

seedAll();