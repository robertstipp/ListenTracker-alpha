import express from "express"; 
import path from "path"; 
import fs from "fs/promises"; 
const router = express.Router(); 
const multer = require('multer'); 
const ffmpeg = require('fluent-ffmpeg');
// by default this will save to the server, would like this to save to cloud storage
const upload = multer({dest: 'uploads'}); 

// Create a new audio 
router.post('/upload', async (req, res) => {
    // req body has track name, artist name 
    const {track, audio} = req.body;  

    try {

        // const audio = await createAudio()

    } catch (e) {

    }
}); 