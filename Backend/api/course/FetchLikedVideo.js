const Course = require('../../Model/CourseModel');
const User = require('../../Model/UserModel');


async function FetchLikedVideo (req, res) {
    const { userId } = req.body; // Assuming you send userId and videoId in the body

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const course = await Course.findById(user.likedVideos);
        res.status(200).json({
            status:true,
            message: 'view liked',
            data: course,
        });
    } catch (error) {
        return res.status(400).json({ message: 'Error fetching video', error });
    }
};

module.exports = FetchLikedVideo;
