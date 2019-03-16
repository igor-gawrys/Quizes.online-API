const bookshelf = require('../config/bookshelf');
const Grade = require('../models/Grade');

const Mail = bookshelf.Model.extend({
   tableName:'mails',
   grade:function() {
    return this.hasOne(Grade,'id','grade_id');
  }
});

module.exports = bookshelf.model('Mail',Mail);

module.exports.create = (mail) => {
    return new Mail({
        name:mail.name,
        email:mail.email,
        grade_id:mail.grade_id
    }).save();
};
module.exports.all = async () => {
    const mails = await Mail.forge().fetchAll({withRelated: ['grade']});
    return mails;
};
// mailID = ID
module.exports.find = async (mailID) => {
    const mail = await Mail.where('id', mailID).fetch({withRelated: ['grade']});
    return mail;
};
// mailEmail = email
module.exports.findByMail = async (mailEmail) => {
    const mail = await Mail.where('email', mailEmail).fetch({withRelated: ['grade']});
    return mail;
};
// mailID = ID
module.exports.delete = async (mailID) => {
    await Mail.where('id', mailID).destroy();
    return true;
};
// mailEmail = email
module.exports.deleteByMail = async (mailEmail) => {
    await Mail.where('email', mailEmail).destroy();
    return true;
};
