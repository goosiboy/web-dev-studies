let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/teht10');

// Init the schema
let Schema = mongoose.Schema;

// Create a user - schema
let userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Runs before the schema is saved
userSchema.pre('save', function(next) {
    let currentDate = new Date();

    this.updated_at = currentDate;

    if(!this.created_at)
        this.created_at = currentDate;

    next();
});

// the schema is useless so far we need to create a model using it
let User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
