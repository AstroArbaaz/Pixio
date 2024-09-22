resource "aws_ses_email_identity" "sender" {
  email = var.ses_email_source
}
