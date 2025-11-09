require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const allRoutes = require('./routes/index');
const port = process.env.PORT || 3000;
const connectDB = require('./config/db');

// Pasang CORS global
app.use(cors({
  origin: [
    'https://managher-v2.vercel.app',
    'http://localhost:3001'
  ],
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true
}));

app.use(express.json());
connectDB();

app.use(allRoutes)

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
});

module.exports = app;

 