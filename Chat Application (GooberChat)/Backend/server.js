const express = require("express");
const app = express()

app.get('/', (req, res) => {
    res.send("In the beginning, there was the word. And that word was food.")
})

app.listen(3000, console.log("Server started on port 3000"))