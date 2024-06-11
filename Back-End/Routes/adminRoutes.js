const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminModel = require('../Schema/adminSchema');
const { loginSchema } = require('./validator');
const authenticateAdmin = require('../Middleware/authenticateAdmin');

const secretKey = process.env.JWT_SECRET;

router.post('/login', async (req, res) => {
    try {
        const { error } = loginSchema.validateAsync(req.body);
        if (error) {
            console.log(`Login validation failed for admin ${req.body.email}: ${error.details[0].message}`);
            return res.status(400).send({ message: 'Validation error' });
        }

        const { email, password } = req.body;
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(400).send({ message: 'Admin not found' });
        }
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: admin._id }, secretKey, { expiresIn: '1h' });

        res.status(200).send({ message: 'Logged in successfully!', token });
    } catch (error) {
        console.error('Error logging in as admin:', error);
        res.status(500).send({ message: 'Error logging in as admin' });
    }
});


router.get('/profile',async  (req, res) => {
    try {
        const adminData = await adminModel.find().populate('reference')
        res.send(adminData)
    } catch (error) {
        res.send({error})
    }
   
})


router.post('/profile', async (req, res) => {
try {
    const adminUser = new adminModel(req.body)
    await adminUser.save()
    res.status(200).send({msg: "data added successfully", data: adminUser})
} catch (error) {
    res.send({error})
}




})




module.exports = router;