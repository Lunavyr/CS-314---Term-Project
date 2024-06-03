const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Config/database");
const UserRoutes = require("./Routes/UserRoutes");
const ChatRoutes = require("./Routes/ChatRoutes");
const MessageRoutes = require("./Routes/MessageRoutes")
const {notFound, errorHandler} = require("./ErrorHandlers/error");

dotenv.config()
connectDB();
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("In the beginning, there was the word. And that word was food.");
})


app.use('/api/user', UserRoutes);
app.use('/api/chat', ChatRoutes);
app.use('/api/message', MessageRoutes);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(5000, console.log("Server started on port 5000"));
const sockfd = require("socket.io")(server, {pingTimeout: 30000, cors:{origin: "http://localhost:3000"}})

sockfd.on("connection", (socket) => {
    console.log("Connected to socket.io.")

    socket.on("setup", (userData) =>{
        socket.join(userData._id);
        socket.emit("connected")
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("Connected to " + room)
    });

    socket.on("new message", (newMessage) => {
        var chat = newMessage.chat;
        if (!chat.users) {
            return console.log("Users not present in chat.")
        }
        chat.users.forEach(user =>{
            if (user._id == newMessage.sender._id) {
                return;
            }
            socket.in(user._id).emit("message recieved", newMessage)
        })
    });

    socket.off("setup", () => {
        console.log("disconnected")
    })
});

sockfd.on("disconnect", () => {
    console.log("User disconnected.")
});
