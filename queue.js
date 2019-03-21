require('dotenv').config();
var rand = require("random-key");
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const quizes = [];
//Config
const config = require('./config/socket');

//Broadcast

io.on('connection', function(socket){
   socket.on('quiz.connect', function(data){
    data.key = rand.generate(7);
    data.players = [];
    quizes.push(data);
    data.index = quizes.length - 1;
    io.emit('quiz.key.'+data.id,data);
  });
  socket.on('quiz.player_connect', function(data){
    quizes.filter((quiz) => {
      if(quiz.key == data.key){
        quiz.players.push(data);
        io.emit('players.'+quiz.key,quiz);
      }
    });
  });
  socket.on('quiz.started', function(data){
      io.emit('quiz.started.'+data.key,data);
  });
  socket.on('quiz.question', function(data){
      io.emit('quiz.question.'+data.key,data);
  });
  socket.on('quiz.answer', function(data){
    quizes.filter((quiz) => {
        quiz.players.filter((player)=>{
             player.answer = data.answer;
            if(data.answer.correct) {
             player.points = data.counter  / 10 * 1000;
            }
             io.emit('quiz.answered.'+data.key,data);
        });
    });
  });
  socket.on('quiz.ended', function(data){
    quizes.filter((quiz) => {
     if(quiz.id == data.id){
      io.emit('quiz.ended.'+quiz.key,data);
      io.emit('quiz.players.'+quiz.key,quiz.players);
      quizes.splice(quiz.index,1);
     }
    });
  });
});

http.listen(config.port || 3000, function(){
  console.log('Web socket runned !');
});