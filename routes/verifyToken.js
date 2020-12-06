const jwt = require('jsonwebtoken');

const auth = (req , res , next) =>{
    const token = req.header('auth-token');
    if(!token) {
        return res.status(401).send('Access denied');
    }

    try {
        const verfied = jwt.verify(token , process.env.TOKEN_SECRET);
        req.user = verfied;
        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
}

module.exports = auth;