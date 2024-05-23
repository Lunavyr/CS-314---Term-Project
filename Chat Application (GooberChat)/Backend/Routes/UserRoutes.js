const express = require("express");
const {register, authenticate} = require("../Controllers/UserController")

const router = express.Router();

router.route('/register').post(register)
router.post('/login', authenticate)


module.exports = router;