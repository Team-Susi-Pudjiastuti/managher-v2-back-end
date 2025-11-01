const express = require('express');
const app = express();
const cors = require('cors');
const allRoutes = require('./routes/index');
const port = process.env.PORT || 3000;
const connectDB = require('./config/db');

app.use(
  cors({
    origin: [
      "http://localhost:3001",      // frontend lokal (Next.js)
      "https://managher-2.vercel.app" // nanti kalau frontend sudah di-deploy
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
connectDB();

app.use(allRoutes)

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
});

module.exports = app;

 