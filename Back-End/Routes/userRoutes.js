require('dotenv').config();
const express = require('express');
const router = express.Router();
const userModel = require('../Schema/userSchema');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const{registerSchema, loginSchema} = require('./validator');
const admin = require('firebase-admin');
const serviceAccount = require('../hopeful-hounds-firebase-adminsdk-hila6-3d29bc8165.json');
const redis = require('redis');

console.log("FIREBASE_SERVICE_ACCOUNT_KEY:", process.env.FIREBASE_SERVICE_ACCOUNT_KEY);


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});



const secretKey = process.env.JWT_SECRET;

const uploadsDir = path.join(__dirname,'../uploads');
if(!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({storage: storage});

const handleValidationError = (error, res) => {
    if(error && error.details && error.details[0] && error.details[0].message){
        return res.status(400).send({message: error.details[0].message});
    }
    return res.status(400).send({message: 'Validation error'});
}


router.post('/register', upload.single('profilePicture'), async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const profilePicture = req.file;
        const { error } = registerSchema.validateAsync({...req.body, profilePicture});
        if (error) {
            console.log(`Registration validation failed for user ${email}: ${error.details[0].message}`)
            return handleValidationError(error, res);
        }
        
        if (!username || !email || !password) {
            return res.status(400).send({ message: 'All fields are required' });
        }
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            console.log(`Registration attempt failed for existing user ${email}`);
            return res.status(409).send({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
            profilePicture: req.file ? req.file.path : null
        });

        await newUser.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send({ message: 'Error registering user' });
    }
});
router.post('/login', async(req, res) => {
    try{
        const { error } = loginSchema.validateAsync(req.body);
        if (error) {
            console.log(`Login validation failed for user ${req.body.email}: ${error.details[0].message}`);
            return handleValidationError(error, res);
        }
        const {email ,password} = req.body;
        const user = await userModel.findOne({email});
        if(user){
            const passwordMatch = await bcrypt.compare(password, user.password);
            if(passwordMatch){
                const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
                console.log(`User logged in successfully: ${email}`);
                res.status(200).send({message: 'Logged in successfully!', token});
            }else{
                console.log(`Invalid password attempt for user ${email}`);
                res.status(400).send('Invalid email or password');
            }
        }else{
            res.status(400).send({message: 'User not found'});
        }
    }catch(error){
        console.error('Error logging in:', error);
        res.status(500).send({message: 'Error logging in'});
    }
})

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if(!token) return res.status(401).send({message:'Access Denied'});

    redisClient.get(token, (err, reply) => {
        if(reply) return res.status(400).send({message: 'Invalid Token'});
        try{
            const verified = jwt.verify(token, secretKey);
            req.user = verified;
            next();
        }catch(error){
            if(error instanceof TokenExpiredError){
                return res.status(401).send({message: 'Token has expired'});
            }else{
                return res.status(400).send({message: 'Invalid Token'});
            }
        }
    })
    

    try{
        const verified = jwt.verify(token, secretKey);
        req.user = verified;
        next();
    }catch(error){
        if(error instanceof TokenExpiredError){
            return res.status(401).send({message: 'Token has expired'});
        }else{
            return res.status(400).send({message: 'Invalid Token'});
        }
    }

};

router.get('/protected', authenticateToken, (req, res) => {
    res.send({message:'This is a protected route'});
})


router.post('/firebaseLogin', async(req, res) => {
    const {token} = req.body;
    try{
        const decodedToken = await admin.auth().verifyIdToken(token);
        const {uid, email} = decodedToken;
        let user = await userModel.findOne({email});
        if(!user){
            user = new userModel({
                username: email.split('@')[0],
                email,
                password: '',
                profilePicture: ''
            });
            await user.save();
        }
        const jwtToken = jwt.sign({id: user._id}, secretKey, {expiresIn: '1h'});
        res.status(200).send({message: 'Logged in successfully!', token: jwtToken});
    }catch(error){
        console.error('Error logging in with Firebase', error);
        res.status(500).send({message:'Error logging in with firebase'});
    }
})

router.post('/logout', authenticateToken, async (req, res) => {
    const token = req.header('Authorization');
    await redisClient.set(token, true);
    res.status(200).send({message: 'Logged out successfully'});
})

module.exports = router;

