const express = require("express");
const {register, authenticate, getUser} = require("../Controllers/UserController")
const {validate} = require("../Controllers/authInternal")

const router = express.Router();

// Registers a user. Requires a name, email, and password to be send with API request.
router.route('/').post(register)
// Attempts to log into an existing user account. Requres email and password.
router.post('/login', authenticate)
// Searches user - requires that a logged in user's JWT be send to api before the search can begin.
// Search accepts strings to search for. Example: search {jo} - result {John}
router.route('/getUser').get(validate, getUser);


module.exports = router;