import React, {useRef, useState} from 'react'
import axios from 'axios'

const Upload =  () => {

  const fileRef = useRef<HTMLInputElement | null>(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fileRef.current) {
    const file = fileRef.current.files[0] 
    const formData = new FormData();
    formData.append('audioFile', file);

    const {name} = file;
    const extension = name.split('.').pop(); 


      if (extension === 'mp3') {
        try {
          const response = await axios.post('/upload', formData);
          console.log("Upload success", response)
        } catch (error) {
          console.error("Uploaded failed:", error)
        }
      }
    
    }
  }
  return (
    <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column"}}>
      <input ref={fileRef} type="file" name="audio" id="audio_file" />
      <label htmlFor="artist_name">Artist Name</label>
      <input type="text" name="artist_name" id="artist_name" />
      <label htmlFor="artist_name">Track Name</label>
      <input type="text" name="track_name" id="track_name" /> 
      <button type="submit">Upload</button>
    </form>
  )
}

export default Upload