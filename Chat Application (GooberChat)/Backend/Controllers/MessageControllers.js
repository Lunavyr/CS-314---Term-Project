const asyncHandler = require("express-async-handler");
const Chat = require("../DataModels/chat");
const User = require("../DataModels/user");
const Message = require("../DataModels/message");

const sendMessage = asyncHandler(async (req,res) =>{
    const {content, chatId} = req.body;
    if (!content || !chatId) {
        console.log("Error. Invalid message or chat id.")
        return res.sendStatus(400);
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    };

    try {
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "name");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "name email"
        });

        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: message
        });

        res.json(message);
    }
    catch(error){
        res.status(400);
        throw new Error(error.message);
    }
});

const getMessages = asyncHandler(async (req, res) => {
    try {
        const messages = await Message.find({chat:req.params.chatId})
            .populate("sender", "name email")
            .populate("chat");
        res.json(messages);
    } 
    catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

module.exports = {sendMessage, getMessages}