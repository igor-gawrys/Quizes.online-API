require('dotenv').config()
const config_facebook = require('./config/facebook')
const config_mailer = require('./config/mailer')
const moment = require('moment')
const Bot = require('./models/Bot')
const Mail = require('./models/Mail')
const Grade = require('./models/Grade')
const Notification = require('./models/Notification')
'use strict';
const BootBot = require('bootbot');
const nodemailer = require("nodemailer");

const bot = new BootBot({
  accessToken:config_facebook.access,
  verifyToken:config_facebook.verify,
  appSecret:config_facebook.secret
});
bot.on('message',async (payload, chat) => { 
  const sender = await Bot.findBySender(payload.sender.id);
  if(sender !=null){
    chat.say("Witaj ponownie :)");
  }else{
    chat.say("Witaj,wpisz rejestracja aby rozpocząć !");
  }
});
bot.hear('rejestracja', async (payload, chat) => {
    const askGrade = (convo) => {
		convo.ask(`Jak nazywa się twoja klasa ?`, (payload, convo) => {
			const text = payload.message.text;
			convo.set('grade', text);
            //convo.say(`Dobrze,twoja klasa nazywa się ${text}`).then(() => askKey(convo));
            convo.say(`Dobrze,twoja klasa nazywa się ${text}`).then(() => sendSummary(convo));
		});
    };
    // const askKey = (convo) => {
	// 	convo.ask(`Jaki jest unikatowy klucz twojej klasy ?`, (payload, convo) => {
	// 		const text = payload.message.text;
	// 		convo.set('key', text);
	// 		convo.say(`Dobrze,twój klucz to ${text}`).then(() => sendSummary(convo));
	// 	});
    // };
    const sendSummary = async (convo) => {
    const grade = await Grade.findByName(convo.get('grade'));
    if(grade !=null){
        await Bot.create({
            sender_id:payload.sender.id,
            grade_id:grade.id
        });
        convo.say("Dobrze zebrałem już wszystkie dane możesz już zacząć korzystać z schooll multinotify bot !");
    }else{
        convo.say("Niestety taka klasa nie istnieje spróbuj ponownie wpisując 'rejestracja' :(");
    }
    convo.end();
    };
    chat.conversation((convo) => {
		askGrade(convo);
	});
});
bot.hear('wyrejestruj', async (payload, chat) => {
    await Bot.deleteBySender(payload.sender.id);
    chat.say("Zostałeś prawidłowo wyrejestrowany ! Miło mi się z tobą pracowało :)");
});
setInterval(async ()=>{
  //Bots
  const bots = await Bot.all();
  bots.filter(async (item)=>{
    const grade = await Grade.find(item.toJSON().grade.id);
    grade.toJSON().notifications.filter((notification)=>{
      if(notification.sended_bots_at==null){
          bot.say(item.toJSON().sender_id,notification.content);
          Notification.update(notification.id,{
              content:notification.content,
              sended_bots_at:moment(moment.now()).format("YYYY-MM-DD hh:mm:ss")
          });
      }
    });
  });
  //Mails
  const grades = await Grade.all();
  grades.filter(async (grade)=>{
    const item = await Grade.find(grade.toJSON().id);
    item.toJSON().notifications.filter(async (notification)=>{
      if(notification.sended_mails_at==null){
        grade.toJSON().mails.filter(async (mail)=>{
          let transporter = nodemailer.createTransport(config_mailer);
          await transporter.sendMail({
            from: '"Scholl MultiNotify" <no-reply@id.socialler.eu>', // sender address
            to: mail.email, // list of receivers
            subject: "Powiadomienie od klasy-"+item.toJSON().name, // Subject line
            text: "Powiadomeinie......"+notification.content, // plain text body
            html: "<h1 style='text-align:center'>Powiadomienie !</h1><br/><p>"+notification.content+"</p>" // html body
          });
          Notification.update(notification.id,{
              content:notification.content,
              sended_mails_at:moment(moment.now()).format("YYYY-MM-DD hh:mm:ss")
          });
        });
      }
    });
  });
},5000);
bot.start();