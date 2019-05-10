'use strict'

exports.DATABASE_URL = 
    process.env.DATABASE_URL || "mongodb+srv://my-new-user:Coolguy32@my-first-mlab-db-vmc3g.mongodb.net/dogparksapp?retryWrites=true?";
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 
 'mongodb://localhost/test-dogparksapp';
exports.PORT = process.env.PORT || 8080;       
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';