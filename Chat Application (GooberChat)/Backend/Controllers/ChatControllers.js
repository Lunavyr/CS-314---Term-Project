const asyncHandler = require("express-async-handler");
const Chat = require("../DataModels/chat");
const User = require("../DataModels/user");

const getChat = asyncHandler(async (req, res) => {
    const {userId} = req.body;
    if (!userId) {
        console.log("User ID not sent in function call.");
        return res.sendStatus(400);
    }

    var exists = await Chat.find({
        isGroupChat: false,
        $and: [
            {users: {$elemMatch:{$eq: req.user._id}}},
            {users: {$elemMatch: {$eq: userId}}},
        ]
    }).populate("users", "-password").populate("latestMessage");

    exists = await User.populate(exists, {
        path: "latestMessage.sender",
        select: "name"
    });

    if(exists.length > 0) {
        res.send(exists[0])
    }
    else {
        var chatInfo = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        };

        try {
            const protoChat = await Chat.create(chatInfo);
            const chat = await Chat.findOne({_id: protoChat._id}).populate("users", "-password");
            res.status(200).send(chat);
        }
        catch(error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
});

const getChats = asyncHandler(async (req, res) => {
    try {
        Chat.find({users:{$elemMatch:{$eq: req.user._id}}})
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({updatedAt: -1})
            .then(async(chats) => {
                chats = await User.populate(chats, {
                    path: "latestMessage.sender",
                    select: "name"
                })
                res.status(200).send(chats);
            });
    }
    catch {
        res.status(400);
        throw new Error(error.message);
    }
});

const deleteChat = asyncHandler(async(req, res) => {
    const chatId = req.body.chatId;
    if (!chatId) {
        return res.status(400).send({message: "Error. Chat id not provided."});
    }

    try {
        const deleted = await Chat.findByIdAndDelete(chatId);

        if(!deleted) {
            res.status(404);
            throw new Error("Error deleting chat. Check chat ID.")
        }
        else {
            res.status(200).send({message: "Chat deleted:"}).send(deleted)
        }
    }
    catch(error) {
        res.status(400);
        throw new Error(error.message)
    }
});

const makeGChat = asyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({message: "Error. Users and/or chat name not provided."});
    }

    var users = JSON.parse(req.body.users);
    if (users.length < 2) {
        return res.status(400).send("Error. Three or more users must be provided");
    }

    users.push(req.user);

    try {
        const groupC = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user
        });

        const groupChat = await Chat.findOne({ _id: groupC._id})
            .populate("users", "-password")
            .populate("groupAdmin", "-password");
        res.status(200).json(groupChat)
    }
    catch(error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const renameGchat = asyncHandler(async (req, res) => {
    const {chatId, chatName} = req.body;
    if (!req.body.chatId || !req.body.chatName) {
        return res.status(400).send({message: "Error. Chat id/name not provided."});
    } 

    const updatedChat = await Chat.findByIdAndUpdate(chatId, {chatName},{new:true})
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!updatedChat) {
        res.status(404);
        throw new Error("Group chat not found.");
    }
    else {
        res.json(updatedChat)
    }
});

const addToGChat = asyncHandler(async (req, res) => {
    const {chatId, userId} = req.body;
    if (!req.body.chatId || !req.body.userId) {
        return res.status(400).send({message: "Error. Users/chat id(s) not provided."});
    }

    const add = await Chat.findByIdAndUpdate (
        chatId,
        {$push: {users: userId}},
        {new: true}
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

    if(!add) {
        res.status(404);
        throw new Error("Error adding to group chat. Check User and Chat ids.")
    }
    else {
        res.json(add);
    }
});

const removeFromGChat = asyncHandler(async (req, res) => {
    const {chatId, userId} = req.body;
    if (!req.body.chatId || !req.body.userId) {
        return res.status(400).send({message: "Error. Users/chat id(s) not provided."});
    }

    const removed = await Chat.findByIdAndUpdate (
        chatId,
        {$pull: {users: userId}},
        {new: true}
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

    if(!removed) {
        res.status(404);
        throw new Error("Error removing from group chat. Check User and Chat ids.")
    }
    else {
        res.json(removed);
    }
});

module.exports = {getChat, getChats, deleteChat, makeGChat, renameGchat, addToGChat, removeFromGChat}