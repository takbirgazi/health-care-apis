import { Request } from "express";
import config from "../../../config";
import prisma from "../../shared/prisma";
import bcrypt from "bcryptjs";
import { fileUploader } from "../../helper/fileUpload";

const createPatient = async (req: Request) => {
    if (req.file) {
        const uploadImage = await fileUploader.uploadToCloudinary(req.file);
        req.body.patient.profilePhoto = uploadImage?.secure_url
    }
 
    const { password, patient } = req.body;
    const hasPassword = await bcrypt.hash(password, Number(config.BCRYPT_SALT_ROUND));

    return await prisma.$transaction(async tnx => {
        await tnx.user.create({
            data: {
                email: patient.email,
                password: hasPassword
            }
        });

        return await tnx.patient.create({
            data: patient
        })
    })
};

export const UserService = {
    createPatient,
}