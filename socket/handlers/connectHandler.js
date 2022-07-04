const {addNewConnection} = require('../socketStore');
const {updatePendingFriends, updateFriends} = require('./friendsHandler');
const {updateActiveRoomsHandler} = require('./roomHandler');


const connectHandler = async (socket, io) =>{
    addNewConnection(socket.id, socket.user.userId);
    updatePendingFriends(socket.user.userId);
    await updateFriends(socket.user.userId); 
    updateActiveRoomsHandler(socket);
}

module.exports = connectHandler;