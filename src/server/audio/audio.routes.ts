import express from "express"; 
import path from "path"; 
import fs from "fs/promises"; 

const router = express.Router(); 

// Create a new audio 
router.post('/')