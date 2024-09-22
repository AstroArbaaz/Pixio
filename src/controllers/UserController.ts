import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import { ApiResponse } from "../response_handlers/api_response";

export const UserController = {
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name } = req.body;
      const user = await UserService.createUser(email, name);
      return ApiResponse.success(res, "User created successfully", user);
    } catch (error) {
      next(error);
    }
  },

  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await UserService.getAllUsers();
      return ApiResponse.success(res, "Users retrieved successfully", users);
    } catch (error) {
      next(error);
    }
  },

  getUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const user = await UserService.getUser(parseInt(userId));
      if (!user) {
        return ApiResponse.error(res, "User not found", 404);
      }
      return ApiResponse.success(res, "User retrieved successfully", user);
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const { email, name } = req.body;
      const user = await UserService.updateUser(parseInt(userId), email, name);
      return ApiResponse.success(res, "User updated successfully", user);
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      await UserService.deleteUser(parseInt(userId));
      return ApiResponse.success(res, "User deleted successfully");
    } catch (error) {
      next(error);
    }
  },
};
