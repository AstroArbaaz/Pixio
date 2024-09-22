import { prisma } from "../server";

export const CommentService = {
  addComment: async (imageId: number, content: string, userId: number) => {
    return prisma.comment.create({
      data: {
        content,
        imageId,
        userId,
      },
    });
  },
};
