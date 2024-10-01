const mongoose = require('mongoose');
const Course = require('../../Model/CourseModel');

async function CourseUpload(req, res) {
  try {
    const data = req.body;

    const newCourse = new Course(data);
    const saveCourse = await newCourse.save();
    console.log('Saved Course data : ', saveCourse);
    res.status(201).json({
      succes: true,
      data: saveCourse,
    });
  } catch (error) {
    res.status(400).json({
      succes: false,
      message: 'error to upload course',
      error,
    });
  }
}

module.exports = CourseUpload;
