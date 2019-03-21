require('dotenv').config()
const path = require('path');
const config = require('./config/app');
const routes = require('./routes/index');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
var cors = require('cors')
const session = require('express-session');

//Get config
const port = config.port;
const secret = config.secret;

const app = express();

app.set('views',path.join(__dirname,'views'));
app.use('/storage',express.static(path.join(__dirname,'storage/public')));
app.use('/',express.static(path.join(__dirname,'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(cookieParser());

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));
app.use(flash());

app.use(cors());

app.use('/api/',routes);


const server = app.listen(port || 3000, () => console.log(`App runned on ${port}!`))

