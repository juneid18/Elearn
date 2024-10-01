const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type : String,
        required: true,
    },
    category: {
        type : String,
        required: true,
    },
    videoUrl: {
        type : String,
        required: true,
    },
    imageUrl: {
        type:String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
