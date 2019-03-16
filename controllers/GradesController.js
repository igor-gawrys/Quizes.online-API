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
exports.create = async (req,res)=>{
    const user = await User.findSocial(req.user.id);
     if(user==null){
        await User.create({
           social_user_id:req.user.id
        });
     }
    await Grade.create({
        name:req.body.name,
        color:req.body.color,
        user_id:req.user.id
    });
    res.json({message:"Prawidłowo utworzono !"});
}
exports.update = async (req,res)=>{
    await Grade.update(req.params.grade,{
        name:req.body.name,
        color:req.body.color
    });
    res.json({message:"Prawidłowo zaktualizowano !"});
}
exports.delete = async (req,res)=>{
    const grade = await Grade.delete(req.params.grade);
    res.json({message:"Prawidłowo usunięto !",deleted:grade});
}