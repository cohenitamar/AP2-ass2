const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app)
const {Server} = require("socket.io");
const io = new Server(server);

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

io.on('connection', (socket) => {
    console.log('A client connected');

    socket.on("connecting", (userUsername) => {
        console.log(userUsername,"try to connect");
        if(sockets[userUsername]){
            console.log("DISCONNECTING MULTIPLE LOGINS")
            sockets[userUsername] = null;
        }
        sockets[userUsername] = socket;
        console.log(userUsername, "connected successfully");
    })

    socket.on("add-contact",(username) => {
        if(!sockets[username]){
            return;
        }

        sockets[username].emit("add-contact");
        console.log(username)
    })

    socket.on("receive-message",(msgFormat) => {
        if(!sockets[msgFormat.receiverUsername]) {

            return;
        }
        sockets[msgFormat.receiverUsername].emit("receive-message",(msgFormat))
        // Send a message to the client
    })
    socket.emit('message', 'Welcome to the server!');
})


server.listen(process.env.PORT, () => {
    console.log("Listening to port 5000");
});
