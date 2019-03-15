require('dotenv').config()
const config = require('./config/facebook')
const moment = require('moment')
const Bot = require('./models/Bot')
const Grade = require('./models/Grade')
const Notification = require('./models/Notification')
'use strict';
const BootBot = require('bootbot');

const bot = new BootBot({
  accessToken:config.access,
  verifyToken:config.verify,
  appSecret:config.secret
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
setInterval(async ()=>{
  const bots = await Bot.all();
  bots.filter(async (item)=>{
    const grade = await Grade.find(item.toJSON().grade.id);
    grade.toJSON().notifications.filter((notification)=>{
      if(notification.sended_at==null){
          bot.say(item.toJSON().sender_id,notification.content);
          Notification.update(notification.id,{
              content:notification.content,
              sended_at:moment(moment.now()).format("YYYY-MM-DD hh:mm:ss")
          });
      }
    });
  });
},5000);
bot.start();