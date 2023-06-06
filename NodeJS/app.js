const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app)
const {Server} = require("socket.io");
const io = new Server(server);

app.use(express.json());
const bodyParser = require('body-parser');
const cors = require('cors');


const registerRouter = require('./routes/registerRoute');
const loginRouter = require('./routes/loginRoutes')
const chatsRouter = require('./routes/chatsRoutes')

const mongoose = require('mongoose');
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

io.on('connection', (socket) => {

    socket.on("connecting", (userUsername) => {
        sockets[userUsername] = socket;
    })

    socket.on("add-contact", (username) => {
        if (!sockets[username]) {
            return;
        }

        sockets[username].emit("add-contact");
    })

    socket.on("receive-message", (msgFormat) => {
        if (!sockets[msgFormat.receiverUsername]) {
            return;
        }
        sockets[msgFormat.receiverUsername].emit("receive-message", (msgFormat))
        // Send a message to the client
    })
    socket.emit('message', 'Welcome to the server!');

    socket.on("closeSocket",(username)=>{
        socket.in(username).emit("closeSocket");
      socket.leave(username);


    })
})


server.listen(process.env.PORT);
