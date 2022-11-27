const bcrypt = require('bcrypt');

const hashPassword = async (pw) => {
    // Generate salt for hashing password
    // Recommended rate is 12
    const salt = await bcrypt.genSalt(12);
    // Hash password with the salt
    const hash = await bcrypt.hash(pw, salt)
    console.log(salt);
    console.log(hash);
}
const altHasher = async (pw) => {    
    // Hash password with the salt
    // Recommended rate is 12
    const hash = await bcrypt.hash(pw, 12)
    console.log(hash);
}

const login = async (pw, hashpw) => { 
    const result = await bcrypt.compare(pw, hashpw);
    if (result) {
        console.log("Password is correct")
    } else { 
        console.log("Password is incorrect")
    }
}
hashPassword('password');
altHasher('password');
login('password', '$2b$10$WPa8V5X.Z2lEXqlazqKg7.5YGGpI9xA6mhc1hLvuwF33O1xGKYcNi')
