const bookshelf = require('../config/bookshelf');
const Grade = require('../models/Grade');

const User = bookshelf.Model.extend({
   tableName:'users',
   grades:function() {
    return this.hasMany(Grade,'user_id','id');
   }
});

module.exports.create = (user) => {
    return new User({
        social_user_id:user.id
    }).save();
};
// userID = ID
module.exports.find = async (userID) => {
    const user = await User.where('id', userID).fetch({withRelated: ['grades']});
    return user;
};
// userID = Social User ID
module.exports.findSocial = async (userID) => {
    const user = await User.where('social_user_id', userID).fetch({withRelated: ['grades']});
    return user;
};
