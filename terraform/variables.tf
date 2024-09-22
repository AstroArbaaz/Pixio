variable "project_name" {
  description = "Name of the project"
  default     = "image-processing"
}

variable "aws_region" {
  description = "AWS region to deploy to"
  default     = "us-east-1"
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  default     = "10.0.0.0/16"
}

variable "db_username" {
  description = "Username for the RDS instance"
}

variable "db_password" {
  description = "Password for the RDS instance"
}

variable "db_name" {
  description = "Name of the database to create"
  default     = "imagedb"
}

variable "ses_email_source" {
  description = "Verified email address for sending emails through SES"
}