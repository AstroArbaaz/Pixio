# Pixio

# Backend Web Service for Image Processing

This README provides instructions for setting up, testing, and running the Backend Web Service for image upload and processing. The application is built using Node.js, Express, TypeScript, and PostgreSQL with Prisma ORM. It utilizes AWS Cloud Services for hosting, storage, and email sending via SES.

## Prerequisites

Before you begin, ensure you have the following installed:

- Docker
- Node.js (v14 or later)
- npm (Node Package Manager)
- AWS CLI (configured with appropriate credentials)
- Terraform

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <project-directory>
   ```

2. Create a `.env` file in the root directory and add the following environment variables:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5433/dbname?schema=public"
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_REGION=your_aws_region
   S3_BUCKET_NAME=your_s3_bucket_name
   SES_EMAIL_FROM=your_verified_email@example.com
   SES_EMAIL_SOURCE="your-verified-email@example.com"
   ADMIN_EMAILS="admin1@example.com,admin2@example.com"
   DATABASE_USER="user"
   DATABASE_PASSWORD="testing"
   DATABASE_NAME="postgres"
   ```

3. Install dependencies:
   ```
   npm install
   ```

## Running the Application

### Using Docker

1. Build and start the containers:
   ```
   docker-compose up --build -d
   ```

2. The application will be available at `http://localhost:3000`

### Without Docker

1. Start the PostgreSQL database (ensure it's running on localhost:5432)

2. Run the Prisma migrations:
   ```
   npx prisma migrate dev
   ```

3. Start the application:
   ```
   npm run start
   ```

4. The application will be available at `http://localhost:3000`

## Testing

1. Run the test suite:
   ```
   npm run test
   ```

## API Endpoints

### Image Routes

- `POST /images`: Upload an image file
- `POST /images/:imageId/comments`: Add a comment to an image
- `GET /images`: Retrieve a list of all images
- `GET /images/:imageId`: Retrieve a specific image

### User Routes

- `POST /users`: Create a new user
- `GET /users`: Retrieve a list of all users
- `GET /users/:userId`: Retrieve a specific user
- `PUT /users/:userId`: Update a user
- `DELETE /users/:userId`: Delete a user


## Terraform Configuration

The Terraform configuration is distributed across multiple files in the `terraform` directory:

- `main.tf`: Main configuration file
- `variables.tf`: Variable definitions
- `outputs.tf`: Output values
- `s3.tf`: S3 bucket configuration
- `ec2.tf`: EC2 instance configuration
- `rds.tf`: RDS (PostgreSQL) configuration
- `ses.tf`: SES configuration

To apply the Terraform configuration:

1. Navigate to the `terraform` directory:
   ```
   cd terraform
   ```

2. Initialize Terraform:
   ```
   terraform init
   ```

3. Review the planned changes:
   ```
   terraform plan
   ```

4. Apply the configuration:
   ```
   terraform apply
   ```

## Deployment

1. Build the Docker image:
   ```
   docker build -t backend-web-service .
   ```

2. Push the image to your preferred container registry (e.g., Amazon ECR)

3. Update your deployment configuration (e.g., ECS task definition or Kubernetes manifests) with the new image

4. Deploy the updated configuration to your hosting environment

## Troubleshooting

- If you encounter database connection issues, ensure that the `DATABASE_URL` in your `.env` file matches the configuration in `docker-compose.yml`, also ensure that the migration worked in the docker terminal, just cd into app directory and test the connection.
- For AWS-related issues, verify that your AWS CLI is correctly configured and that the provided credentials have the necessary permissions