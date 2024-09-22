import { prisma } from "../server";

export const UserService = {
  createUser: async (email: string, name: string) => {
    return prisma.user.create({
      data: { email, name },
    });
  },

  getAllUsers: async () => {
    return prisma.user.findMany();
  },

  getUser: async (userId: number) => {
    return prisma.user.findUnique({
      where: { id: userId },
    });
  },

  updateUser: async (userId: number, email: string, name: string) => {
    return prisma.user.update({
      where: { id: userId },
      data: { email, name },
    });
  },

  deleteUser: async (userId: number) => {
    return prisma.user.delete({
      where: { id: userId },
    });
  },
};
