import { SendEmailCommand } from "@aws-sdk/client-ses";
import { prisma, sesClient } from "../server";

export const NotificationService = {
  notifyAllUsers: async (subject: string, message: string) => {
    const users = await prisma.user.findMany();
    for (const user of users) {
      await NotificationService.sendEmail(user.email, subject, message);
    }
  },

  notifyAdmins: async (subject: string, message: string) => {
    const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];
    for (const email of adminEmails) {
      await NotificationService.sendEmail(email, subject, message);
    }
  },

  sendEmail: async (to: string, subject: string, message: string) => {
    try {
      await sesClient.send(
        new SendEmailCommand({
          Destination: { ToAddresses: [to] },
          Message: {
            Body: { Text: { Data: message } },
            Subject: { Data: subject },
          },
          Source: process.env.SES_EMAIL_SOURCE!,
        })
      );
    } catch (error) {
      console.error(`Failed to send email to ${to}:`, error);
    }
  },
};
