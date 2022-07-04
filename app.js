const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const { createServer } = require('http');
const { Server } = require('socket.io');


const errorHandler = require('./controllers/error');
const authRouter = require('./routes/auth');
const friendsRouter = require('./routes/friends');
const chatRouter = require('./routes/chat');
const registerSocketServer = require('./socket/socketServer');


const app = express();
const httpServer = createServer(app);

dotenv.config({
  path: './config/config.env',
});

app.use(
  express.json({
    limit: '50kb',
  })
);

app.use(cors());

app.use('/auth', authRouter);
app.use('/friends', friendsRouter);
app.use('/chat', chatRouter);
app.use(errorHandler);


(async()=>{
    const options = {
        useUnifiedTopology:true,
        useNewUrlParser:true,
        serverSelectionTimeoutMS:10000,
        socketTimeoutMS:45000 
    }
  
    try{
        await mongoose.connect(process.env.CONNECT_MONGODB_LOCAL, options);
        console.log('Successfully connected to database');
    }
    catch (e){
        console.log('an error occurred while connecting to database', e);
    }
  })();



  registerSocketServer(httpServer);


//TODO: ON LOGOUT operate ondisconnect listener




const PORT = process.env.PORT || 8080



httpServer.listen(PORT, ()=>{
       console.log(`%cServer starts on port ${PORT}`);
});

