const express = require('express');
const connectDB = require('./Config/dbconn');
const app = express();
const dogRoute = require('./Routes/DogDetailsRoutes');
const accessoriesRoute = require('./Routes/accessoriesRoutes');
const hospitalsRoute = require('./Routes/hospitalsRoutes');
app.use(express.json());
connectDB();
app.get('/', (req, res) => {
    res.send('Get request through express')
})
app.get('/ping', (req, res) => {
    res.send("Endpoint")
})
app.use('/dog', dogRoute);
app.use('/accessory', accessoriesRoute);
app.use('/hospital', hospitalsRoute);
app.listen(3000, () => {
    console.log("Server running on port 3000");
})