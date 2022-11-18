var bcrypt = require('bcrypt');

const cryptPassword = async (password) =>{
    const hash = await bcrypt.hash(password, 10);
    return hash;
};

const comparePassword = async (plainPass, hashword) =>{
    const result = await bcrypt.compare(plainPass, hashword);
    return result;
};
module.exports = {cryptPassword,comparePassword}