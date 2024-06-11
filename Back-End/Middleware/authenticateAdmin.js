// const jwt = require('jsonwebtoken');
// const adminModel = require('../Schema/adminSchema');
// const secretKey = process.env.JWT_SECRET;

// const authenticateAdmin = async(req, res, next) => {
//     const token = req.header('Authorization');
//     if(!token) return res.status(401).send({message: 'Access Denied'});
//     try{
//         const verified = jwt.verify(token, secretKey);
//         const admin = await adminModel.findById(verified.id);
//         if(!admin || !admin.isAdmin){
//             return res.status(402).send({message: 'Forbidden'});
//         }
//         req.admin = admin;
//         next();
//     }catch(error){
//         res.status(400).send({message: 'Invalid Token'});
//     }
// };
// module.exports = authenticateAdmin;

const jwt = require('jsonwebtoken');
const adminModel = require('../Schema/adminSchema');

const secretKey = process.env.JWT_SECRET;

const authenticateAdmin = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send({ message: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        const admin = await adminModel.findById(decoded.id);

        if (!admin) {
            throw new Error();
        }

        req.admin = { id: admin._id, email: admin.email };
        next();
    } catch (error) {
        console.error('Error authenticating admin:', error);
        res.status(401).send({ message: 'Invalid or expired token' });
    }
};

module.exports = authenticateAdmin;
