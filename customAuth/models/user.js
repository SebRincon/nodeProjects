const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { PassThrough } = require('stream');
const userSchema = new mongoose.Schema({

    username: {
        type: String,
        // Require password & supply feedback at error
        required: [true, "Username cannot be blank"]
    },
    password: {
        type: String,
        // Require password & supply feedback at error
        required: [true, "Password cannot be blank"]
    }
})

// Middleware for the save function which will has the password before saving
userSchema.pre('save', async function (next) { 
    // if not modification to password skip the hash function
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

userSchema.statics.findAndValidate = async function (username, password) { 
    const foundUser = await this.findOne({ userSchema })
    const isValid = await bcrypt.compare(password, foundUser.password);
    
    return isValid ? foundUser : false;
}

// Export user schema model
module.exports = mongoose.model('User', userSchema);