import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import config from "../../config";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), "/uploads"))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage });

const uploadToCloudinary = async (file: Express.Multer.File) => {
    cloudinary.config({
        cloud_name: config.CLOUDINARY.CLOUD_NAME,
        api_key: config.CLOUDINARY.API_KEY,
        api_secret: config.CLOUDINARY.API_SECRET
    });

    // Upload an image
    return await cloudinary.uploader
        .upload(
            file.path, {
            public_id: file.filename,
        }
        )
        .catch((error) => {
            console.log(error);
        });
};

export const fileUploader = {
    upload,
    uploadToCloudinary
}