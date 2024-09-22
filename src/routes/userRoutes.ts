import express from "express";
import { UserController } from "../controllers/UserController";

const router = express.Router();

router.post("/", UserController.createUser);
router.get("/", UserController.getAllUsers);
router.get("/:userId", UserController.getUser);
router.put("/:userId", UserController.updateUser);
router.delete("/:userId", UserController.deleteUser);

export const userRoutes = router;
