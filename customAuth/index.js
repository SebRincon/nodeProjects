const bcrypt = require('bcrypt');

const hashPassword = async (pw) => {
    // Generate salt for hashing password
    const salt = await bcrypt.genSalt(10);
    // Hash password with the salt
    const hash = await bcrypt.hash(pw, salt)
    console.log(salt);
    console.log(hash);
}

hashPassword('password');

