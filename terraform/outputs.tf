output "alb_dns_name" {
  value       = aws_lb.main.dns_name
  description = "The DNS name of the load balancer"
}

output "ecr_repository_url" {
  value       = aws_ecr_repository.app.repository_url
  description = "The URL of the ECR repository"
}

output "rds_endpoint" {
  value       = aws_db_instance.main.endpoint
  description = "The connection endpoint for the RDS instance"
}

output "s3_bucket_name" {
  value       = aws_s3_bucket.images.id
  description = "The name of the S3 bucket for storing images"
}