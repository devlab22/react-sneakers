const express = require('express');
const path = require('path');
const app = express();

PORT = 9000;
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  console.log(`server on port ${PORT}`)
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT);