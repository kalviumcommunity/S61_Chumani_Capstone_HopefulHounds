const express = require('express');
const connectDB = require('./Config/dbconn');
const app = express();
app.use(express.json());
connectDB();
app.get('/', (req, res) => {
    res.send('Get request through express')
})
app.get('/ping', (req, res) => {
    res.send("Endpoint")
})
app.listen(3000, () => {
    console.log("Server running on port 3000");
})