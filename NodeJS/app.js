const express = require('express');
var app = express();
app.use(express.json());
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');
const registerRouter = require('./routes/registerRoute');
const loginRouter = require('./routes/loginRoutes')
const chatsRouter = require('./routes/chatsRoutes')

require('custom-env').env(process.env.NODE_ENV, './config');
mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});

const site = (express.static('public'));

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', site);
app.use('/register', site);
app.use('/chat', site)

app.use('/api/Users', registerRouter);
app.use('/api/Tokens', loginRouter);
app.use('/api/Chats', chatsRouter);


const sockets = {}

app.listen(process.env.Port)