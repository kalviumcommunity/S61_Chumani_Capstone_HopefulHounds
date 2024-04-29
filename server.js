const express = require('express');
const connectDB = require('./Config/dbconn');
const app = express();
const dogRoute = require('./Routes/DogDetailsRoutes');
app.use(express.json());
connectDB();
app.get('/', (req, res) => {
    res.send('Get request through express')
})
app.get('/ping', (req, res) => {
    res.send("Endpoint")
})
app.use('/api', dogRoute);
app.listen(3000, () => {
    console.log("Server running on port 3000");
})