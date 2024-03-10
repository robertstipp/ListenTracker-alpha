import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv"; 
import fs from "fs"; 

dotenv.config(); 
const GC = JSON.parse(fs.readFileSync(process.env.GC_SERVICE_KEY, "utf-8")); 

// Storage Client 
const storage = new Storage({
    keyFilename: process.env.GC_SERVICE_KEY, 
    projectId: GC.projectId,
});

// Bucket Client
const bucketName = process.env.BUCKET_NAME;
const bucket = storage.bucket(bucketName); 

export async function uploadFile(file: Buffer, fileExt: string, trackName: string, artistName: string) {
    const fileName = `${trackName}/${artistName}.${fileExt}`; 

    const cloudFile = bucket.File(fileName);
    await cloudFile.save(file); 

    return fileName; 
}

export async function getSignedUrl(fileName: string): Promise<string> {

    const fileExists = await checkFileExists(fileName);
    if (!fileExists) {
        // TODO: Add more robust error handling
        console.error("File does not exist in Google Cloud."); 
    }

    try {

        const options = {
            version: "v4", 
            action: "read",
            expires: Date.now() + 60 * 60 * 1000,
        }

        const [signedUrl] = await bucket.file(fileName).getSignedUrl(options); 
        return String(signedUrl); 
    } catch (e) {
        // TODO: Make error handling more robust
        console.error(e.message)
    }
};

export async function getUrl(fileName: string) {
    try {

        const fileExists = await checkFileExists(fileName);
        
        if (fileExists) {
            const url = `https://storage.googleapis.com/${process.env.BUCKET_NAME}/${fileName}`;
            return url;
          }
          else {
            throw new Error("File does not exist.");
          }
        
    } catch (e) {
        console.error("Error getting URL: ", e.message )
    }
}

export async function checkFileExists(fileName: string) {
    // Check if file exits
    try {
        const [exists] = await bucket.file(fileName).exists(); 
        return exists; 
    } catch (e) {
        // TODO: Add more robust error handling
        console.error("Error check file existence: ", e.message); 
    }
}