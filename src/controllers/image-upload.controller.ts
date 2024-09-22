// import express, { Request, Response } from "express";
// import multer from "multer";
// import { uploadImage } from "../services/image-upload.service";


// // const upload = multer({
// //   storage: multerS3({
// //     s3: {
// //       bucket: "your-bucket-name",
// //       acl: "public-read",
// //       key: (req:Request, file: { originalname: any; }, cb: (arg0: null, arg1: string) => void) => {
// //         cb(null, `${uuidv4()}-${file.originalname}`);
// //       },
// //     },
// //   }),
// // });

// export const upload = multer({
//   storage: multer.memoryStorage(),
// });


// export const uploadImageController = async (req: Request, res: Response) => {
//   try {
//     const file = req.file;
//     const metadata = req.body;
//     const imageUrl = await uploadImage(file, metadata);
//     res.status(201).json({ imageUrl });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Error uploading image" });
//   }
// }
