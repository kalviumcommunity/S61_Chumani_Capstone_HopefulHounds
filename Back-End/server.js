const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./Config/dbconn');
const app = express();
const dogRoute = require('./Routes/DogDetailsRoutes');
const accessoriesRoute = require('./Routes/accessoriesRoutes');
const hospitalsRoute = require('./Routes/hospitalsRoutes');
const userRoute = require('./Routes/userRoutes');
const adminRoutes = require('./Routes/adminRoutes')
const adminModel = require('./Schema/adminSchema');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next)=> {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
})

connectDB();

app.get('/', (req, res) => {
    res.send('Get request through express')
})
app.get('/ping', (req, res) => {
    res.send("Endpoint")
})
app.use('/api/admin',adminRoutes)
app.use('/api', dogRoute);
app.use('/api/accessory', accessoriesRoute);
app.use('/api/hospital', hospitalsRoute);
app.use('/api/user',  userRoute);
app.use((err, req,res,next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'production' ? {} : err
    })
})
app.listen(4000, () => {
    console.log("Server running on port 4000");
})