const User = require('../../Model/UserModel');

async function LikedVideo (req, res) {
    const { userId, videoId } = req.body; // Assuming you send userId and videoId in the body

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the video is already liked
        const index = user.likedVideos.indexOf(videoId);
        if (index === -1) {
            // If not liked, add to likedVideos
            user.likedVideos.push(videoId);
            await user.save();
            return res.status(200).json({ message: 'Video liked' });
        } else {
            // If already liked, remove from likedVideos
            user.likedVideos.splice(index, 1);
            await user.save();
            return res.status(200).json({ message: 'Video unliked' });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Error liking video', error });
    }
};

module.exports = LikedVideo;
