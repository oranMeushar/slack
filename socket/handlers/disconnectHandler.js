const {removeConnection} = require('../socketStore');
const {getActiveRooms} = require('../socketStore')
const {exitRoomHandler} = require('./roomHandler');

const checkIfUserInRoomAndRemove = (socket) => {

    const activeRoomes = getActiveRooms();

    activeRoomes.forEach(room =>{
        const {participants} = room;

        const foundUser = participants.find(participant => participant.socketId === socket.id);

        if(foundUser) {
            exitRoomHandler(socket, room.id)
        }
    })
}

const disconnectHandler = (socket) =>{
    checkIfUserInRoomAndRemove(socket)
    removeConnection(socket.id);
}

module.exports = disconnectHandler;