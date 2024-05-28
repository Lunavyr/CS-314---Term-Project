const asyncHandler = require("express-async-handler")
const User = require("../DataModels/user")
const generateToken = require("../Config/TokenGen")

const register = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        resizeBy.status(400);
        throw new Error("Please provide data to all the fields.")
    }

    const userExists = await User.findOne({email});

    if (userExists) {
        res.status(400);
        throw new Error("Error. Email is already associated with an account.")
    };

    const user = await User.create({
        name, email, password
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token:generateToken(user._id)
        });
    }
    else {
        res.status(400);
        throw new Error("Error: Failed to create user.")
    }
});

const authenticate = asyncHandler(async(req,res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (user && (await user.matchPass(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    }
    else {
        res.status(401);
        throw new Error("Invalid Email or Password")
    }
});

const getUser = asyncHandler(async(req, res) =>{
    const keyword = req.query.search 
    ? {
        $or: [ 
            {name: {$regex: req.query.search, $options: "i"}},
            {email: {$regex: req.query.search, $options: "i"}}
        ]
    }
    : {};

    const user = await User.find(keyword).find({ _id: {$ne: req.user._id}});
    res.send(user)
});

module.exports = {register, authenticate, getUser}