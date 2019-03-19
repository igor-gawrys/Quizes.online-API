const bookshelf = require('../config/bookshelf');
const Quiz = require('../models/Quiz');

const User = bookshelf.Model.extend({
   tableName:'users',
   quizes:function() {
    return this.hasMany(Quiz,'user_id','social_user_id');
   }
});

module.exports = bookshelf.model('User',User);

module.exports.create = (user) => {
    return new User({
        social_user_id:user.social_user_id
    }).save();
};
// userID = ID
module.exports.find = async (userID) => {
    const user = await User.where('id', userID).fetch({ withRelated: ['quizes'] });
    return user;
};
// userID = Social User ID
module.exports.findSocial = async (userID) => {
    const user = await User.where('social_user_id', userID).fetch({ withRelated: ['quizes'] });
    return user;
};
