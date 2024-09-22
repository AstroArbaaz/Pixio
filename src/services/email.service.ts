import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
  region: "your-region",
  credentials: {
    accessKeyId: "your-access-key-id",
    secretAccessKey: "your-secret-access-key",
  },
});

export class EmailService {
  async notifyUsers(processedImageUrl: string) {
    const params = {
      Source: "your-email-username",
      Destination: {
        ToAddresses: ["user1@example.com", "user2@example.com"],
      },
      Message: {
        Body: {
          Text: {
            Data: `A new image has been processed: ${processedImageUrl}`,
          },
        },
        Subject: {
          Data: "New Image Processed",
        },
      },
    };

    const command = new SendEmailCommand(params);
    await sesClient.send(command);
  }

  async notifyAdmins(errorMessage: string) {
    const params = {
      Source: "your-email-username",
      Destination: {
        // ToAddresses: ["admin1@example.com", "admin2@example.com"],
        ToAddresses: process.env.toAddress?.split(",")
      },
      Message: {
        Body: {
          Text: {
            Data: `An error occurred while processing an image: ${errorMessage}`,
          },
        },
        Subject: {
          Data: "Error Processing Image",
        },
      },
    };

    const command = new SendEmailCommand(params);
    await sesClient.send(command);
  }
}
