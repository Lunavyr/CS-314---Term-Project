const express = require("express");
const {validate} = require("../Controllers/authInternal")
const {
    getChat, 
    getChats, 
    deleteChat,
    makeGChat, 
    renameGchat, 
    addToGChat,
    removeFromGChat,
} = require("../Controllers/ChatControllers")

const router = express.Router();

// All of these API require a JWT to be passed as Bearer token
// All APIs return a JSON of the relevant request

// Gets or creates an individual chat - requires a target user id
router.route('/').post(validate, getChat);
// Get's all chats for the currently logged in user - no requirements
router.route('/').get(validate, getChats);
// Deletes a chat and returns chat info - requires chat id
router.route('/delete').delete(validate, deleteChat);
// Creates a group chat - requires at least 3 users including the currently logged in user
// In other words - two user id must be passed in.
router.route('/group').post(validate, makeGChat);
// Renames a group chat - Requires new name and target group chat Id
router.route('/rename').put(validate, renameGchat);
// Add's a user to an existing group chat - Requires target userId
router.route('/addToGChat').put(validate, addToGChat);
// Removes a user from a group - requires chat id and target user id.
router.route('/removeFromGChat').put(validate, removeFromGChat);

module.exports = router
