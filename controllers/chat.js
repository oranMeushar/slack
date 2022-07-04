const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const FriendInvitation = require('../models/FriendInvitation');
const User = require('../models/User');
const Message = require('../models/Message');
const {updatePendingFriends, updateFriends} = require('../socket/handlers/friendsHandler');
const {updateMessages} = require('../socket/handlers/chatHandlers');

const newMessage = catchAsync(async(req, res, next) =>{


    const {receiverId, type, message} = req.body;

    if(!message.length){
        return next(new AppError('Cannot send empty message', 'failed', 400))
    }

    const newMessage = new Message({
        sender:req.user.id,
        //*TODO: handle case of group chatting
        receivers:[receiverId],
        participants:[receiverId, req.user.id],
        content:message,
        type
    })

    await newMessage.save();
    
    //*TODO: handle case of group chatting(for now this is private chatting)
    updateMessages(newMessage, [receiverId, req.user.id]);

    res.status(201).json({
        status:'Success',
        message:`Successfully saved new message `,
        data:newMessage
    })
});


const chatHistory = catchAsync(async(req, res, next) =>{


    const {chatDetails, chatType} = req.body;

    const participants = [req.user.id, chatDetails.userId]

    const chatHistory = await Message.find({ participants: { $all: participants }, type: chatType }, {updatedAt:0, __v:0}).sort({createdAt:1})

    res.status(200).json({
        status:'Success',
        message:`Successfully saved new message `,
        data:chatHistory
    })
});




module.exports ={
    newMessage,
    chatHistory
}