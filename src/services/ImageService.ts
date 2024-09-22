// import { v4 as uuidv4 } from "uuid";
// import { PutObjectCommand } from "@aws-sdk/client-s3";
// import { prisma, s3Client } from "../server";
// import { NotificationService } from "./NotificationService";

// export const ImageService = {
//   uploadImage: async (file: Express.Multer.File) => {
//     const key = `images/${uuidv4()}-${file.originalname}`;
//     await s3Client.send(
//       new PutObjectCommand({
//         Bucket: process.env.S3_BUCKET_NAME,
//         Key: key,
//         Body: file.buffer,
//         ContentType: file.mimetype,
//       })
//     );

//     const image = await prisma.image.create({
//       data: {
//         filename: file.originalname,
//         s3Key: key,
//         mimeType: file.mimetype,
//       },
//     });

//     await ImageService.processImage(image.id);

//     return image;
//   },

//   processImage: async (imageId: number) => {
//     try {
//       // Simulating image processing
//       console.log(`Processing image with ID: ${imageId}`);

//       await prisma.image.update({
//         where: { id: imageId },
//         data: { status: "PROCESSED" },
//       });

//       await NotificationService.notifyUsers(imageId);
//     } catch (error) {
//       console.error("Error processing image:", error);
//       await prisma.image.update({
//         where: { id: imageId },
//         data: { status: "ERROR" },
//       });
//       throw error;
//     }
//   },
// };

import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma, s3Client } from "../server";
import { NotificationService } from "./NotificationService";

export const ImageService = {
  uploadImage: async (file: Express.Multer.File) => {
    const key = `images/${uuidv4()}-${file.originalname}`;
    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    const image = await prisma.image.create({
      data: {
        filename: file.originalname,
        s3Key: key,
        mimeType: file.mimetype,
      },
    });

    await ImageService.processImage(image.id);

    return image;
  },

  processImage: async (imageId: number) => {
    try {
      // Simulating image processing
      console.log(`Processing image with ID: ${imageId}`);

      await prisma.image.update({
        where: { id: imageId },
        data: { status: "PROCESSED" },
      });

      await NotificationService.notifyAllUsers(
        "Image processed",
        `Image with ID ${imageId} has been processed successfully.`
      );
    } catch (error) {
      console.error("Error processing image:", error);
      await prisma.image.update({
        where: { id: imageId },
        data: { status: "ERROR" },
      });
      await NotificationService.notifyAdmins(
        "Image processing failed",
        `Failed to process image with ID ${imageId}.`
      );
      throw error;
    }
  },

  getAllImages: async () => {
    return prisma.image.findMany({
      include: { comments: true },
    });
  },

  getImage: async (imageId: number) => {
    return prisma.image.findUnique({
      where: { id: imageId },
      include: { comments: true },
    });
  },
};