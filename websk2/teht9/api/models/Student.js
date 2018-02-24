let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/teht8');

let Schema = mongoose.Schema;

let courseSchema = new Schema({
    name: 'String',
    size: Number,
    grade: Number
});

// create a schema
let studentSchema = new Schema({
    studentNumber: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    points: Number,
    courses: [courseSchema],
    created_at: Date,
    updated_at: Date
});

studentSchema.pre('save', function(next) {
    let currentDate = new Date();

    this.updated_at = currentDate;

    if(!this.created_at)
        this.created_at = currentDate;

    next();
});

// the schema is useless so far we need to create a model using it
let Student = mongoose.model('User', studentSchema);

// make this available to our users in our Node applications
module.exports = Student;
