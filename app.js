require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const allRoutes = require('./routes/index');
const port = process.env.PORT || 3000;
const connectDB = require('./config/db');

app.use(cors());
app.use(express.json());
connectDB();

app.use(allRoutes)

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
});

module.exports = app;

 