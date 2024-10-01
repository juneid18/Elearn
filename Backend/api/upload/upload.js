const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const stream = require('stream');

// Configure multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).fields([{ name: 'video' }, { name: 'image' }]);

async function Upload(req, res) {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Multer error:', err);
            return res.status(400).json({ success: false, message: 'Error uploading files.' });
        }

        const { video, image } = req.files;

        if (!video || !image) {
            return res.status(400).json({ success: false, message: 'No video or image uploaded.' });
        }

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        try {
            const uploadVideo = () => {
                return new Promise((resolve, reject) => {
                    const videoStream = cloudinary.uploader.upload_stream(
                        { resource_type: 'video' },
                        (error, result) => {
                            if (error) {
                                console.error('Cloudinary video upload error:', error);
                                return reject(new Error('Error uploading video to Cloudinary.'));
                            }
                            resolve(result.secure_url);
                        }
                    );

                    const bufferStream = new stream.PassThrough();
                    bufferStream.end(video[0].buffer);
                    bufferStream.pipe(videoStream);
                });
            };

            const uploadImage = () => {
                return new Promise((resolve, reject) => {
                    const imageStream = cloudinary.uploader.upload_stream(
                        { resource_type: 'image' },
                        (error, result) => {
                            if (error) {
                                console.error('Cloudinary image upload error:', error);
                                return reject(new Error('Error uploading image to Cloudinary.'));
                            }
                            resolve(result.secure_url);
                        }
                    );

                    const bufferStream = new stream.PassThrough();
                    bufferStream.end(image[0].buffer);
                    bufferStream.pipe(imageStream);
                });
            };

            // Await both uploads
            const videoUrl = await uploadVideo();
            const imageUrl = await uploadImage();

            // Respond with both URLs
            res.status(201).json({
                success: true,
                message: 'Files uploaded successfully!',
                videoUrl: videoUrl,
                imageUrl: imageUrl,
            });

        } catch (error) {
            console.error('Error in upload function:', error);
            return res.status(500).json({ success: false, message: 'Error in upload function.' });
        }
    });
}

module.exports = Upload;
