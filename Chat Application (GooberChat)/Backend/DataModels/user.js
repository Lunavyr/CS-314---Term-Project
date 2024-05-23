const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
    },
    {
        timestamps: true
    }
);

userSchema.methods.matchPass = async function (aPassword) {
    return await bcrypt.compare(aPassword, this.password)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified) {
        next();
    }

    const salt = await bcrypt.genSalt(16)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("User", userSchema)

module.exports = User