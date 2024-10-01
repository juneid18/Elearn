const jwt = require('jsonwebtoken');

async function FetchToken(req, res) {
  try {
    const {token} = req.body;
    if (!token) {
        return res.status(400).json({
          status: false,
          message: 'No token provided',
        });
      }
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    res.status(200).json({
        status: true,
        message: 'Token decoded Sucessfull',
        user: decodedToken,
    });
  } catch (error) {
    res.status(400).json({
        status: false,
        message: 'Error to decode token',
    });
  }
}

module.exports = FetchToken;
