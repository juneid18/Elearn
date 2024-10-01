const cors = require('cors');
const express = require('express');
const connect = require('./dbconfig/db');
require('dotenv').config();
const app = express();
const PORT = 3000;
const SignUp = require('./api/user/signup');
const Login = require('./api/user/login');
const Upload = require('./api/upload/upload');
const FetchToken = require('./api/FetchUserFromToken/fetchToken');
const CourseUpload = require('./api/course/CourseUpload');
const FetchCourse = require('./api/course/FetchCourse');
const likedVideo = require('./api/course/LikedVideo');
const FetchLikedVideo = require('./api/course/FetchLikedVideo');
const path = require('path');

connect();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/signup',SignUp);

app.post('/login',Login);

app.post('/upload', Upload);

app.post('/fetchuser', FetchToken);

app.post('/courseupload', CourseUpload);

app.post('/fetchcourse', FetchCourse);

app.post('/likeVideo', likedVideo);

app.post('/fetchlikeVideo', FetchLikedVideo);


app.listen(PORT , () => {
    console.log('Server is running on port :' + PORT);
});