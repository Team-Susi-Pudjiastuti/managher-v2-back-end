const express = require('express');
const app = express();
const allRoutes = require('./routes/index');
const port = process.env.PORT;

app.use(express.json());
const connectDB = require('./config/db');
connectDB();

app.use(allRoutes)

if (process.env.VERCEL) {
  module.exports = app;
  module.exports.handler = serverless(app);
} else {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

module.exports = app;
module.exports.handler = serverless(app);

 