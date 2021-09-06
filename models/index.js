const Comments = require('./Comments');
const Blog = require('./Blog');
const User = require('./User');

Blog.hasMany(Comments, {
  foreignKey: 'blog_id',
});

Comments.belongsTo(Blog, {
  foreignKey: 'blog_id',
});

module.exports = { User, Comments, Blog};