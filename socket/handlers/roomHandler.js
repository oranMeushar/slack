const{addNewActiveRoom, getSocketServerInstance, getActiveRooms, getActiveConnections, setActiveRooms, getActiveRoom} = require('../socketStore');
const User = require('../../models/User');

const createRoomHandler = async(socket) =>{
    
    const socketId = socket.id;
    const userId = socket.user.userId
    const roomDetails = addNewActiveRoom(socketId, userId);
    //*since the socket is an object of the user who sent it, the line below will emit specifically (directly) to the user himself 
    //*this is basically equal to socket.to(socketId).emit
    socket.emit('new-room', roomDetails);

    updateRooms(userId);
    // updateRooms();
}


const updateRooms = async(userId, targetSocketId = null) =>{
    const io = getSocketServerInstance();
    const activeRooms = getActiveRooms();

    const user = await User.findById(userId, {_id:0, friends:1}).populate({
        path:'friends',
        select: 'name email'
    })

    const {friends: userFriends} = user;

    let receiverListActiveConnections = [];
    
    userFriends.forEach(friend =>{
        receiverListActiveConnections.push(getActiveConnections(friend._id.toString()))
    })
    
    //*added
    receiverListActiveConnections.push(getActiveConnections(userId));

    receiverListActiveConnections = receiverListActiveConnections.reduce((prev, next) =>{
        return prev.concat(next);
    },[])

        
     
    //* i could emit to everyone but i think this is better
    receiverListActiveConnections.forEach(targetId => {
        io.to(targetId).emit('active-rooms', activeRooms);
    });

    // if(targetSocketId){
    //     io.to(targetId).emit('active-rooms', activeRooms)
    // }
    // else{
    //     io.emit('active-rooms', activeRooms)
    // }
}


const joinRoomHandler = async(socket, roomId) =>{
    
    const socketId = socket.id;
    const userId = socket.user.userId;
    const activeRooms = getActiveRooms();

    const updatedActiveRooms = activeRooms.map(room =>{
        if(room.id === roomId){
            return {
                ...room, 
                participants:[...room.participants, {socketId, userId}]
            }
        }
        return room;
    })

    setActiveRooms(updatedActiveRooms);


    //******************************************************* */ 
    //*Send information to users that they should prepare for incoming connections
    const activeRoom = getActiveRoom(roomId);
    const {participants} = activeRoom;

    participants.forEach(participant =>{
        if(participant.socketId !== socketId){
            socket.to(participant.socketId).emit('prepare-connection', {newSocketIdConnection: socketId});
        }

    })
    //*********************************************************
    socket.emit('active-rooms', updatedActiveRooms);
    updateRooms(userId);
}


const exitRoomHandler = async(socket, roomId) =>{
    
    const socketId = socket.id;
    const userId = socket.user.userId;
    const activeRooms = getActiveRooms();
    let emptyRoomIndex = null;

    const updatedActiveRooms = activeRooms.map((room, idx) =>{
        if(room.id === roomId){
            const participants = room.participants.filter(participant => (participant.userId !== userId && participant.socketId !== socketId));
            !participants.length && (emptyRoomIndex = idx);

            return {
                ...room, 
                participants
            }
        }
        return room;
    })

    if(emptyRoomIndex !== null){
        updatedActiveRooms.splice(emptyRoomIndex,1)
    }

    //*Send information to all other users that they should close the connection
    //*with the specified person who left the room
    else{
        const activeRoom = getActiveRoom(roomId);
        const {participants} = activeRoom;

        participants.forEach(participant =>{
            socket.to(participant.socketId).emit('participant-left-room', socketId)
        })
    }

    setActiveRooms(updatedActiveRooms);

    socket.emit('active-rooms', updatedActiveRooms);
    updateRooms(userId);
}


const roomInitilizeConnectionHandler = async(socket, newSocketIdConnection) =>{
    socket.to(newSocketIdConnection).emit('init-connection', {socketIdConnection: socket.id})
}

const updateActiveRoomsHandler = async(socket) =>{
    const activeRooms = getActiveRooms();
    socket.emit('active-rooms', activeRooms);
}


const roomSignalindDataHandler = async(socket, signalData) =>{
    const { signal, socketIdConnection} = signalData;
    socket.to(socketIdConnection).emit('connection-signal', {signal, socketIdConnection:socket.id});
}


module.exports = {
    createRoomHandler,
    updateRooms,
    joinRoomHandler,
    exitRoomHandler,
    updateActiveRoomsHandler,
    roomInitilizeConnectionHandler,
    roomSignalindDataHandler
}