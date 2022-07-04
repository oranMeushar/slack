const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const moment = require ('moment-timezone');

const options = {
    optimisticConcurrency:true,
    timestamps:true,
    selectPopulatedPaths:true,
}

const messageSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    receivers:[
        {
            type:mongoose.Types.ObjectId,
            ref:'User'
        }
    ],
    participants:[
        {
            type:mongoose.Types.ObjectId,
            ref:'User'
        }
    ],

    content:{
        type:'string',
        minLength:[1, 'Cannot send empty message']
    },
    type:{
        type:'string',
    },
}, options);




const Message = mongoose.model('Message', messageSchema);

module.exports = Message;