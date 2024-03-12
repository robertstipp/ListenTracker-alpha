import multer from "multer";
import { join, extname } from "path";
import { existsSync, mkdirSync } from "fs";
import { NextFunction } from "express";

const uploadDir = join(__dirname, "preprocessing");

if (!existsSync(uploadDir)) {
  try {
    mkdirSync(uploadDir);
  } catch (e) {
    console.error("Error creating upload directory: ", e);
  }
}

const storage = multer.diskStorage({
  destination: (cb: any) => {
    cb(null, uploadDir);
  },
  fileName: (cb: any) => {
    cb(null, `Audio${Date.now()}`);
  },
});

// const processMult = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const upload = await multerStore.single("audio");

//     return next();
//   } catch (e) {
//     console.log("Error in Multer processing: ", e);
//   }
// };

const multerStore = multer({ storage: storage });

export default multerStore;
