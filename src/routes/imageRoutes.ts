import express from "express";
import multer from "multer";
import { ImageController } from "../controllers/ImageController";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("image"), ImageController.uploadImage);
router.post("/:imageId/comments", ImageController.addComment);
router.get("/", ImageController.getAllImages);
router.get("/:imageId", ImageController.getImage);

export const imageRoutes = router;
