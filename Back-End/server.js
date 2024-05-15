const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/dbconn');
const app = express();
const dogRoute = require('./Routes/DogDetailsRoutes');
const accessoriesRoute = require('./Routes/accessoriesRoutes');
const hospitalsRoute = require('./Routes/hospitalsRoutes');
app.use(express.json());
app.use(cors());
connectDB();
app.get('/', (req, res) => {
    res.send('Get request through express')
})
app.get('/ping', (req, res) => {
    res.send("Endpoint")
})
app.use('/api', dogRoute);
app.use('/api/accessory', accessoriesRoute);
app.use('/api/hospital', hospitalsRoute);
app.listen(4000, () => {
    console.log("Server running on port 4000");
})