const {getActiveConnections, getSocketServerInstance, getOnlineUsers} = require('../socketStore');

const updateMessages = async(message, users) =>{
    try{
        const io =  getSocketServerInstance();

        
        let receiverListActiveConnections = users.map(userId =>{
            return getActiveConnections(userId);
        })

        receiverListActiveConnections = receiverListActiveConnections.reduce((prev, next) =>{
            return prev.concat(next)
        },[])

        receiverListActiveConnections.forEach(receiverSocketId =>{

            io.to(receiverSocketId).emit('update-chat', message)
        })
    }
    catch(err){
        console.log(err);
    }

}

module.exports = {
    updateMessages
}