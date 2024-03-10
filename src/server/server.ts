import express from 'express';
import path from 'path'

import {logListen} from '../server/controllers/listenTracker'
const app = express();

app.set('trust proxy', 1);

const PORT = 3000;

// TODO Remove Routes
app.get("/music", (req, res) => {
  res.sendFile(path.join(__dirname,'../../data/music-demo.mp3'))
})

app.get("/albumArt", (req, res) => {
  res.sendFile(path.join(__dirname, '../../data/albumart-demo.jpeg'))
})

app.get('/logListen', logListen, (req,res)=> {
  console.log("Audio ListenCompleted")
  res.send("OK")
})
app.listen(PORT, () => console.log(`Server Listening on Port:${PORT}`));
