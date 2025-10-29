const express = require('express');
const app = express();
const allRoutes = require('./routes/index');
const port = process.env.PORT || 3000;
const connectDB = require('./config/db');

app.use(express.json());
connectDB();

app.use(allRoutes)

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
});

module.exports = app;

 