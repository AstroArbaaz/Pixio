// import { Request, Response, NextFunction } from "express";
// import { ImageService } from "../services/ImageService";
// import { CommentService } from "../services/CommentService";
// import { ApiResponse } from "../response_handlers/api_response";

// export const ImageController = {
//   uploadImage: async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const file = req.file;
//       if (!file) {
//         return ApiResponse.error(res, "No file uploaded", 400);
//       }

//       const image = await ImageService.uploadImage(file);
//       return ApiResponse.success(res, "Image uploaded successfully", image);
//     } catch (error) {
//       next(error);
//     }
//   },

//   addComment: async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { imageId } = req.params;
//       const { content } = req.body;

//       const comment = await CommentService.addComment(
//         parseInt(imageId),
//         content
//       );
//       return ApiResponse.success(res, "Comment added successfully", comment);
//     } catch (error) {
//       next(error);
//     }
//   },
// };

import { Request, Response, NextFunction } from "express";
import { ImageService } from "../services/ImageService";
import { CommentService } from "../services/CommentService";
import { NotificationService } from "../services/NotificationService";
import { ApiResponse } from "../response_handlers/api_response";

export const ImageController = {
  uploadImage: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.file;
      if (!file) {
        return ApiResponse.error(res, "No file uploaded", 400);
      }

      const image = await ImageService.uploadImage(file);

      // Send notification to all users about new image upload
      await NotificationService.notifyAllUsers(
        "New image uploaded",
        `A new image "${image.filename}" has been uploaded.`
      );

      return ApiResponse.success(res, "Image uploaded successfully", image);
    } catch (error) {
      await NotificationService.notifyAdmins(
        "Image upload failed",
        "An error occurred during image upload."
      );
      next(error);
    }
  },

  addComment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { imageId } = req.params;
      const { content, userId } = req.body;

      const comment = await CommentService.addComment(
        parseInt(imageId),
        content,
        parseInt(userId)
      );
      return ApiResponse.success(res, "Comment added successfully", comment);
    } catch (error) {
      next(error);
    }
  },

  getAllImages: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const images = await ImageService.getAllImages();
      return ApiResponse.success(res, "Images retrieved successfully", images);
    } catch (error) {
      next(error);
    }
  },

  getImage: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { imageId } = req.params;
      const image = await ImageService.getImage(parseInt(imageId));
      if (!image) {
        return ApiResponse.error(res, "Image not found", 404);
      }
      return ApiResponse.success(res, "Image retrieved successfully", image);
    } catch (error) {
      next(error);
    }
  },
};