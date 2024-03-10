import express from 'express';
import path from 'path'
const app = express();



const PORT = 3000;

// TODO Remove Routes
app.get("/music", (req, res) => {
  res.sendFile(path.join(__dirname,'../../data/music-demo.mp3'))
})

app.get("/albumArt", (req, res) => {
  res.sendFile(path.join(__dirname, '../../data/albumart-demo.jpeg'))
})
app.listen(PORT, () => console.log("Hello world"));
