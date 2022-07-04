const { set } = require('mongoose');
const { Server } = require('socket.io');
const isAuth = require('../middleware/protectedSocket');
const connectHandler = require('./handlers/connectHandler');
const disConnectHandler = require('./handlers/disconnectHandler');
const {setSocketServerInstance} = require('./socketStore');
const {emitOnlineUsers} = require('./handlers/friendsHandler');
const {
   createRoomHandler,
   joinRoomHandler, 
   exitRoomHandler, 
   roomInitilizeConnectionHandler, 
   roomSignalindDataHandler
  } = require('./handlers/roomHandler');
  
const registerSocketServer = (httpServer) =>{

    //*here, if i want i can add more options... see the docs
    const io = new Server(httpServer, {
        cors: {
          origin: 'http://localhost:3000',
          methods: ['GET', 'POST']
    
        //   allowedHeaders: ['my-custom-header'],
        //   credentials: true
        }
    });

    setSocketServerInstance(io);  


    //*This will run before connection
    //* if failed, the code below will never be executed
    io.use((socket, next) =>{
      isAuth(socket, next)
    })  

    io.on('connect', (socket) => {
      // console.log('Total client connections', io.engine.clientsCount);
      connectHandler(socket, io);

  
      socket.on('disconnect', () => {
        disConnectHandler(socket)
      });

      socket.on('log-out', () => {
        disConnectHandler(socket)
      });


      socket.on('new-room', () => {
        createRoomHandler(socket);
      })

      socket.on('join-room', (roomId) => {
        joinRoomHandler(socket, roomId);
      })

      socket.on('exit-room', (roomId) => {
        exitRoomHandler(socket, roomId);
      })

      socket.on('init-connection', (newSocketIdConnection) => {
        roomInitilizeConnectionHandler(socket, newSocketIdConnection);
      })

      socket.on('connection-signal', (signalData) => {
        roomSignalindDataHandler(socket, signalData);
      })

    });  

    emitOnlineUsers();
}

module.exports = registerSocketServer;