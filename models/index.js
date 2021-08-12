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
// Comments.hasOne(User);
// Comments.hasOne(BlogPost);

User.hasMany(Comments, {
  foreignKey: 'commentor'
});

Comments.belongsTo(User,{
  foreignKey: 'commentor'
})

BlogPost.hasMany(Comments,{
    foreignKey: 'PostRef'
})

Comments.belongsTo(BlogPost,{
  foreignKey:'PostRef'
})

module.exports = { User, Comments, BlogPost };
