import { Options } from "multer";
import multer from "multer"; 
import path from "path";

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, "..", "..", "uploads"),
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 8 * 1024 * 1024 //8mb
  },
  fileFilter: (req, file, callback) => {
    const mimeType = ["image/png", "image/jpeg", "image/jpg", "image/pdf"];
    if (!mimeType.includes(file.mimetype)) {
      return callback(null, false)
    }
    callback(null, true);
  }
} as Options;