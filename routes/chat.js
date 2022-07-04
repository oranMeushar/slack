const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat');
const protected = require('../middleware/protected');

router.post('/new-message', protected, chatController.newMessage);
router.post('/history', protected, chatController.chatHistory);





module.exports = router;