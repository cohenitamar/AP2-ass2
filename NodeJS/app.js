const express = require('express');
var app = express();
app.use(express.json());
const bodyParser = require('body-parser');
const cors = require('cors');

const jwt = require("jsonwebtoken")
const key = "OriItamarTalKey"

const mongoose = require('mongoose');
const registerRouter = require('./routes/registerRoute');
const loginRouter = require('./routes/loginRoutes')
require ('custom-env').env(process.env.NODE_ENV,'./config');
mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});
const site = (express.static('public'));
app.use('/',site);
app.use('/register',site);
app.use('/chat',site)
app.use(cors())
app.use(bodyParser.urlencoded({extended : true}));

app.use('/api/Users',registerRouter);
app.use('/api/Tokens', loginRouter);


app.listen(process.env.Port)