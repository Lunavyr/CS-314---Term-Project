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

app.listen(3000, console.log("Server started on port 3000"));