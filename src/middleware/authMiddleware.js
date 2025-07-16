const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];


        if(!token) {
            return res.status(401).json({ message: 'No token provided, authorization denied' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            console.log('the decoded user is:',req.user)
            next();
        } catch (error) {
            console.error('Token verification failed:', error);
            return res.status(401).json({ message: 'Token is not valid' });
        }
    }
    else {
        return res.status(401).json({ message: 'no token , Authorization header is missing or malformed' });
        
    }
}

module.exports = verifyToken;