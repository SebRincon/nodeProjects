const mongoose = require('mongoose');
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

// Export user schema model
module.exports = mongoose.model('User', userSchema);