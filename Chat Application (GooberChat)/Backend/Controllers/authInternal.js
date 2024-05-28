const jwt = require("jsonwebtoken");
const User = require("../DataModels/user");
const asyncHandler = require("express-async-handler");

const validate = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        }
        catch(error) {
            res.status(401);
            throw new Error("User validation failed.")
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Unauthorized access - no token provided")
    }
});

module.exports = {validate};