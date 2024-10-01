const Course = require('../../Model/CourseModel');

async function FetchCourse(req,res) {
    try {
        const responce = await Course.find();
        res.status(200).json({
            status: true,
            message: 'data is fetched properly',
            data: responce,
        });
    } catch (error) {
        res.status(400).json({
            succes: false,
            message: 'error to fetch courses',
            error: error,
          });
    }
}

module.exports = FetchCourse;
