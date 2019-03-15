const bookshelf = require('../config/bookshelf');
const Notification = require('../models/Notification');
const Grade = bookshelf.Model.extend({
   tableName:'grades',
   notifications:function() {
    return this.hasMany(Notification,'grade_id','id');
  }
});

module.exports = bookshelf.model('Grade',Grade);

module.exports.create = (grade) => {
    return new Grade({
        name:grade.name,
        color:grade.color,
        user_id:grade.user_id
    }).save();
};
// gradeID = ID
module.exports.find = async (gradeID) => {
    const grade = await Grade.where('id', gradeID).fetch({withRelated: ['notifications']});
    return grade;
};
// gradeName = NAME
module.exports.findByName = async (gradeName) => {
    const grade = await Grade.where('name', gradeName).fetch({withRelated: ['notifications']});
    return grade;
};
// gradeID = ID
module.exports.delete = async (gradeID) => {
    await Grade.where('id', gradeID).destroy();
    return true;
};
// gradeID = ID
module.exports.update = async (gradeID,grade) => {
    await Grade.where('id', gradeID).save({
       name:grade.name,
       color:grade.color
    },{
        method: 'update',
        patch: true
    });
    return true;
};
