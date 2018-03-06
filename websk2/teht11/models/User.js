let mongoose = require('../db');

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: String,
    email: String,
    password: String
});

let User = mongoose.model('User', UserSchema);

module.exports = User;