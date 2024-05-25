const express = require('express');
const router = express.Router();
const userModel = require('../Schema/userSchema');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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


router.post('/register', upload.single('profilePicture'), async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).send({ message: 'All fields are required' });
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
        const {email ,password} = req.body;
        const user = await userModel.findOne({email});
        if(user){
            const passwordMatch = await bcrypt.compare(password, user.password);
            if(passwordMatch){
                res.status(200).send({message: 'Logged in successfully!'});
            }else{
                res.status(400).send('Invalid email or password');
            }
        }
    }catch(error){
        console.error('Error logging in:', error);
        res.status(500).send({message: 'Error logging in'});
    }
})
module.exports = router;

