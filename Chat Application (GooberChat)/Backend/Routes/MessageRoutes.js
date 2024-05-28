const express = require('express');
const {validate} = require("../Controllers/authInternal")
const {sendMessage, getMessages} = require("../Controllers/MessageControllers")

const router = express.Router();

// Sends a message to target chat - requires text content and chat id.
router.route('/').post(validate, sendMessage);
// Retrieves all chats for currently logged in user - no requirements.
router.route('/:chatId').get(validate, getMessages);

module.exports = router;