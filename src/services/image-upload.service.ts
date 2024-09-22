// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { PrismaClient } from "@prisma/client";
// import { v4 as uuidv4 } from "uuid";

// const s3Client = new S3Client({
//   region: "your-region",
//   credentials: {
//     accessKeyId: "your-access-key-id",
//     secretAccessKey: "your-secret-access-key",
//   },
// });

// const prisma = new PrismaClient();

// export async function uploadImage(file: any, metadata: any) {
//   const { name, type, size } = file;
//   const key = `${uuidv4()}-${name}`;
//   const params = {
//     Bucket: "your-bucket-name",
//     Key: key,
//     Body: file.buffer,
//     ContentType: type,
//   };

//   try {
//     const command = new PutObjectCommand(params);
//     const data = await s3Client.send(command);
//     const imageUrl = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
//     await prisma.image.create({
//       data: {
//         url: imageUrl,
//         metadata: JSON.stringify(metadata),
//       },
//     });
//     return imageUrl;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// }

// const addComment = async (imageId: number, text: string) => {
//   return await prisma.comment.create({
//     data: {
//       imageId,
//       text,
//     },
//   });
// };
