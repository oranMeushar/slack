const User = require('../../models/User');
const FriendInvitation = require('../../models/FriendInvitation');
const {getActiveConnections, getSocketServerInstance, getOnlineUsers} = require('../socketStore');

const updatePendingFriends = async(receiverId) =>{
    try{
        const io =  getSocketServerInstance();
        const pendingInvitations = await FriendInvitation.find({
            receiverId
        }).populate('senderId', '_id name email') || [];

        // console.log('pendingInvitations = ', pendingInvitations);
        //*Find all active connections of specified userId
        const receiverListActiveConnections = getActiveConnections(receiverId);

        receiverListActiveConnections.forEach(receiverSocketId =>{

            io.to(receiverSocketId).emit('invitation', pendingInvitations)
        })
    }
    catch(err){
        console.log(err);
    }

}

const updateFriends = async(userId) =>{
    try{
        const io =  getSocketServerInstance();
        const user = await User.findById(userId).populate({
            path: 'friends',
            select:'name email'
        })

        const receiverListActiveConnections = getActiveConnections(userId);

        receiverListActiveConnections.forEach(receiverSocketId =>{
            io.to(receiverSocketId).emit('friends-list', (user.toObject().friends || []))
        })
    }
    catch(err){
        console.log(err);
    }
}


const emitOnlineUsers = () =>{
    const io =  getSocketServerInstance();
    // const onlineUsers = getOnlineUsers();
    // io.emit('online-users', onlineUsers);

    setInterval(() =>{
        const onlineUsers = getOnlineUsers();
        console.log('Online users = ', onlineUsers);
        io.emit('online-users', onlineUsers);
    },5000)
}








module.exports = {
    updatePendingFriends,
    updateFriends,
    emitOnlineUsers
}