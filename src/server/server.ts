import express from 'express';
import path from 'path';
const multer = require('multer');
const multerStore = require('./processing/processAudio.service');
// const ffmpeg = require('fluent-ffmpeg');
const upload = multer({ dest: 'uploads' });
const app = express();

const PORT = 3000;

// TODO Remove Routes
app.get('/music', (req, res) => {
  res.sendFile(path.join(__dirname, '../../data/music-demo.mp3'));
});

app.get('/albumArt', (req, res) => {
  res.sendFile(path.join(__dirname, '../../data/albumart-demo.jpeg'));
});

// Upload Audio Route
app.post('/upload', upload.single('musicFile'), (req, res) => {
  // console.log(req.file)
  // const file = req.file as Express.Multer.File;
  // const filePath = req.file.path;

  console.log('Upload received');
  res.status(200).send('OK');
});
// Encoding Route

app.listen(PORT, () => console.log('Hello world'));
