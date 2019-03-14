const Notification = require('../models/Notification')
exports.show = async (req,res)=>{
    const notification = await Notification.find(req.params.notification);
    res.json({data:notification});
}
exports.create = async (req,res)=>{
    await Notification.create({
        content:req.body.content,
        user_id:req.user.id,
        grade_id:req.body.grade_id
    });
    res.json({message:"Prawidłowo utworzono !"});
}
exports.delete = async (req,res)=>{
    const notification = await Notification.delete(req.params.notification);
    res.json({message:"Prawidłowo usunięto !",deleted:notification});
}