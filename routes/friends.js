const express = require('express');
const router = express.Router();
const friendsController = require('../controllers/friends');
const protected = require('../middleware/protected');

router.post('/invite', protected, friendsController.invite);
router.post('/accept-invitation', protected, friendsController.acceptInvitation);
router.post('/reject-invitation', protected, friendsController.rejectInvitation);




module.exports = router;