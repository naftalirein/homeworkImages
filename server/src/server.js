// app.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const processRouter = require('./routes/processRouter');

const app = express();
app.use(cors());
app.use(express.static(path.resolve('./public')));
app.use('/process', processRouter);

const port = 3010;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});