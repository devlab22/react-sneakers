const express = require('express');
const path = require('path');
const app = express();

const fs = require('fs')

const rawdata = fs.readFileSync('config.json');
const config = JSON.parse(rawdata);

const PORT = config.PORT || 8000

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
 console.log(`server on port ${PORT}`)
});