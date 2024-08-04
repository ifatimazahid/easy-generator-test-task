const crypto = require('crypto');

//To generate SECRET_KEY
const secret = crypto.randomBytes(32).toString('base64');
console.log(secret);