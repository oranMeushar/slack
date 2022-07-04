const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const FriendInvitation = require('../models/FriendInvitation');
const User = require('../models/User');
const {updatePendingFriends, updateFriends} = require('../socket/handlers/friendsHandler');


const invite = catchAsync(async(req, res, next) =>{
    const {email} = req.body;

    const senderId = req.user.id;

    const receiver = await User.findOne({email});

    if(email.toLowerCase() === req.user.email.toLowerCase()){
        return next(new AppError('You cannot invite yourself', 'Failed', 400));
    }

    if(!receiver){
        return next(new AppError('Email was not found', 'Failed', 404));
    }

    const friendInvitation = await FriendInvitation.findOne({senderId, receiverId: receiver.id})

    if(friendInvitation){
        return next(new AppError(`Invitation was already sent to ${email}`, 'Failed', 400));
    }

    const isAlreadyFriends = req.user.friends.find(friendId => friendId.toString() === receiver.id.toString());

    if(isAlreadyFriends){ 
        return next(new AppError('You are already friends', 'Failed', 400));
    }

    
    await FriendInvitation.create({
        senderId,
        receiverId:receiver.id,
    });
    
    updatePendingFriends(receiver.id);

    res.status(201).json({
        status:'Success',
        message:`Invitation was successfully sent to ${email} `,
    })
});


const acceptInvitation = catchAsync(async(req, res, next) =>{

    const senderInvitation = await FriendInvitation.findById( req.body._id);

    const {senderId} = senderInvitation

    await User.findByIdAndUpdate(req.user.id, {$push: {friends:senderId}}, {new:true})
    await User.findByIdAndUpdate(senderId, {$push: {friends:req.user.id}}, {new:true})

    await FriendInvitation.findByIdAndDelete(req.body._id);


    updatePendingFriends(req.user.id);
    updateFriends(req.user.id);
    updateFriends(senderId.toString());

    res.status(200).json({
        status:'Success',
        message:`Successfully added new friend`,
    })
});

const rejectInvitation = catchAsync(async(req, res, next) =>{

    const senderId = req.body._id;

    await FriendInvitation.findByIdAndDelete(senderId);

    updatePendingFriends(req.user.id);

    res.status(200).json({
        status:'Success',
        message:`Invitation was successfully removed`,
    })
});
module.exports ={
    invite,
    acceptInvitation,
    rejectInvitation
}