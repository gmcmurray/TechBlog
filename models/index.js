const User = require('./User');
const Comments = require('./Comments');
const BlogPost = require('./BlogPost');

User.hasMany(BlogPost, {
  foreignKey: 'creator',
  onDelete: 'SET NULL'
});

BlogPost.belongsTo(User, {
  foreignKey: 'creator'
});

User.hasMany(Comments, {
  foreignKey: 'commentor'
});

Comments.belongsTo(User,{
  foreignKey: 'commentor'
})

BlogPost.hasMany(Comments,{
    foreignKey: 'PostRef',
    onDelete: 'SET NULL'
})

Comments.belongsTo(BlogPost,{
  foreignKey:'PostRef'
})

module.exports = { User, Comments, BlogPost };
