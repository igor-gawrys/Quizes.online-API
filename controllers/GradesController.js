const User = require('../models/User')
const Grade = require('../models/Grade')
exports.index = async (req,res)=>{
    const user = await User.findSocial(req.user.id);
    res.json({data:user});
}
exports.show = async (req,res)=>{
    const grade = await Grade.find(req.params.grade);
    res.json({data:grade});
}