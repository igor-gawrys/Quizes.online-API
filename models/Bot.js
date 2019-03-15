const bookshelf = require('../config/bookshelf');
const Grade = require('../models/Grade');
const Bot = bookshelf.Model.extend({
   tableName:'bots',
   grade:function() {
    return this.hasOne(Grade,'id','grade_id');
  }
});
module.exports.create = (bot) => {
    return new Bot({
        sender_id:bot.sender_id,
        grade_id:bot.grade_id
    }).save();
};
module.exports.all = async () => {
    const bots = await Bot.forge().fetchAll({withRelated: ['grade']});
    return bots;
};
// botID = ID
module.exports.find = async (botID) => {
    const bot = await Bot.where('id', botID).fetch({withRelated: ['grade']});
    return bot;
};
// senderID = senderID
module.exports.findBySender = async (senderID) => {
    const bot = await Bot.where('sender_id', senderID).fetch({withRelated: ['grade']});
    return bot;
};