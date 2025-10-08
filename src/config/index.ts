import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    NODE_ENV: process.env.NODE_ENV,
    API_BASE_URL: process.env.API_BASE_URL,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND,
    CLOUDINARY: {
        CLOUD_NAME: process.env.CLOUD_NAME,
        API_KEY: process.env.API_KEY,
        API_SECRET: process.env.API_SECRET
    },
    JWT: {
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_EXPIRE: process.env.JWT_EXPIRE,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
        JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE
    }
}