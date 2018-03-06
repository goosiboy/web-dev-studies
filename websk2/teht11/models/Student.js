let mongoose = require('../db');

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

let Student = mongoose.model('Student', studentSchema);

module.exports = Student;
