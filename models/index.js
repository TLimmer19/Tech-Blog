const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

Post.hasMany(Comment, {
  foreignKey: 'post_id',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
})

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

module.exports = { User, Comment, Post};