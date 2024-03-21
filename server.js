const express = require('express');
const path = require('path');
const app = express();
const dirname = process.cwd();
const fs = require('fs')

const rawdata = fs.readFileSync('config.json');
const config = JSON.parse(rawdata);

const PORT = config.PORT || 8000
const HOST = config.HOST || 'localhost'

app.use(express.static(path.join(dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(dirname, 'build', 'index.html'));
});

app.listen(PORT, HOST, () => {
 console.log(`server run on ${HOST}:${PORT}`)
});