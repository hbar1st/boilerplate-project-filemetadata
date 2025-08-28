const express = require('express');
const multer = require("multer");
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

const upload = multer({ dest: "./public/data/uploads/" });

/**
 * 
 */
app.post("/api/fileanalyse", upload.single("upfile"), function (req, res) {
  // req.file is the name of your file in the form above, here 'upfile'
  // req.body will hold the text fields, if there were any
  console.log(req.file, req.body);
  res.json({name: req.file.filename, type: req.file.mimetype, size: req.file.size})
});
