interface ResetPasswordTemplateProps {
  resetLink: string;
}

export const resetPasswordTemplate = ({ resetLink }: ResetPasswordTemplateProps) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="color: #4a4a4a;">Reset Your Password</h1>
  <p>You've requested to reset your password. Click the button below to set a new password:</p>
  <a href="${resetLink}" style="display: inline-block; background-color: #0070f3; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-top: 15px;">Reset Password</a>
  <p>If you didn't request this, you can safely ignore this email.</p>
  <p>This link will expire in 1 hour for security reasons.</p>
  <p>Best regards,<br>Aglint Team</p>
</body>
</html>
`;