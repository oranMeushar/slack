const mongoose = require('mongoose');



const options = {
    optimisticConcurrency:true,
    timestamps:true,
    selectPopulatedPaths:true,
}

const friendInvitationSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    receiverId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
}, options);


const FriendInvitation = mongoose.model('FriendInvitation', friendInvitationSchema);

module.exports = FriendInvitation;