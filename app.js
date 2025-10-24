const express = require('express');
const app = express();

const port = 3000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = require('./config/db');
connectDB();

const allRoutes = require('./routes/index');
app.use(allRoutes)

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
});

module.exports = app;

 