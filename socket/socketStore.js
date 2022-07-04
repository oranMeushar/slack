
const uuid = require('uuid');
const connectedUsers = new Map();
let activeRoomes = [];

let io;

const setSocketServerInstance = (ioInstance) =>{
    io = ioInstance;
}

const getSocketServerInstance = () =>{
    return io;
}

const addNewConnection = (socketId, userId) =>{
    connectedUsers.set(socketId, {userId});
}

const removeConnection = (socketId) =>{
    connectedUsers.delete(socketId);
    console.log('after remove: ', connectedUsers);
}


//*A single user could be connected from multuple devices
const getActiveConnections = (receiverId) =>{
    const activeConnections = []
    connectedUsers.forEach((value, key) =>{
        if(value.userId === receiverId){
            activeConnections.push(key);        
        }
    })
    return activeConnections;
}

const getOnlineUsers = () =>{
    const onlineUsers = [];

    connectedUsers.forEach((value, key) =>{
        onlineUsers.push({socketId:key, userId:value.userId})
    })

    return onlineUsers;
}

const addNewActiveRoom = (socketId, userId) =>{
    const newRoom = {
        id:uuid.v4(),
        creator:{
            socketId,
            userId
        },
        participants:[
            {socketId, userId}
        ]
    }

    // console.log('activeRoomes = ', activeRoomes); 
    activeRoomes.push(newRoom);
    return newRoom;
}

const getActiveRooms = () =>{
    return [...activeRoomes];
}

const setActiveRooms = (i_activeRooms) =>{
    activeRoomes = i_activeRooms;
}

const getActiveRoom = (roomId) =>{
    return activeRoomes.find(room => room.id === roomId);
}


module.exports = {
    addNewConnection,
    removeConnection,
    getActiveConnections,
    setSocketServerInstance,
    getSocketServerInstance,
    getOnlineUsers,
    addNewActiveRoom,
    getActiveRooms,
    setActiveRooms,
    getActiveRoom
}