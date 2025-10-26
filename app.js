const express = require('express');
const app = express();
const allRoutes = require('./routes/index');
const port = 3000 || process.env.PORT;

app.use(express.json());
const connectDB = require('./config/db');
connectDB();

app.use(allRoutes)

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
});

module.exports = app;

 