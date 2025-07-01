const transporter = require('../config/mailer');

const generateOtpTemplate = (otp, userEmail = '', expiryMinutes = 5) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification - ELTS App</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa; line-height: 1.6;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 40px 20px;">
            <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden;">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
                    ELTS App
                  </h1>
                  <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px; font-weight: 300;">
                    Secure Email Verification
                  </p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 50px 40px;">
                  <h2 style="margin: 0 0 24px 0; color: #2c3e50; font-size: 24px; font-weight: 600; text-align: center;">
                    Verify Your Email Address
                  </h2>
                  
                  <p style="margin: 0 0 32px 0; color: #5a6c7d; font-size: 16px; text-align: center; line-height: 1.5;">
                    We've received a request to verify your email address. Please use the verification code below to complete the process.
                  </p>
                  
                  <!-- OTP Container -->
                  <div style="background-color: #f8f9fb; border: 2px dashed #e1e8ed; border-radius: 12px; padding: 32px; margin: 32px 0; text-align: center;">
                    <p style="margin: 0 0 16px 0; color: #5a6c7d; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">
                      Your Verification Code
                    </p>
                    <div style="font-family: 'Courier New', monospace; font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #2c3e50; margin: 16px 0; padding: 20px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e1e8ed;">
                      ${otp}
                    </div>
                    <p style="margin: 16px 0 0 0; color: #e74c3c; font-size: 14px; font-weight: 500;">
                      ⏱️ Expires in ${expiryMinutes} minutes
                    </p>
                  </div>
                  
                  <!-- Instructions -->
                  <div style="background-color: #fff7e6; border-left: 4px solid #f39c12; padding: 20px; margin: 32px 0; border-radius: 4px;">
                    <h3 style="margin: 0 0 12px 0; color: #d68910; font-size: 16px; font-weight: 600;">
                      📋 How to use this code:
                    </h3>
                    <ol style="margin: 0; padding-left: 20px; color: #85651d;">
                      <li style="margin-bottom: 8px;">Return to the ELTS App verification page</li>
                      <li style="margin-bottom: 8px;">Enter the 6-digit code exactly as shown above</li>
                      <li>Complete your email verification</li>
                    </ol>
                  </div>
                  
                  <!-- Security Notice -->
                  <div style="background-color: #fef9e7; border: 1px solid #fad5a5; border-radius: 8px; padding: 20px; margin: 32px 0;">
                    <p style="margin: 0 0 12px 0; color: #dc6803; font-size: 14px; font-weight: 600;">
                      🔒 Security Notice
                    </p>
                    <p style="margin: 0; color: #b45309; font-size: 14px; line-height: 1.4;">
                      This code is confidential and intended only for you. Never share it with anyone. If you didn't request this verification, please ignore this email and consider changing your password.
                    </p>
                  </div>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f8f9fb; padding: 30px 40px; border-top: 1px solid #e1e8ed;">
                  <p style="margin: 0 0 16px 0; color: #5a6c7d; font-size: 14px; text-align: center;">
                    Need help? Contact our support team at 
                    <a href="mailto:support@eltsapp.com" style="color: #667eea; text-decoration: none; font-weight: 500;">support@eltsapp.com</a>
                  </p>
                  
                  <div style="text-align: center; margin: 24px 0 16px 0;">
                    <p style="margin: 0; color: #2c3e50; font-size: 16px; font-weight: 600;">
                      Best regards,
                    </p>
                    <p style="margin: 4px 0 0 0; color: #667eea; font-size: 16px; font-weight: 600;">
                      The ELTS App Team
                    </p>
                  </div>
                  
                  <hr style="border: none; border-top: 1px solid #e1e8ed; margin: 24px 0;">
                  
                  <p style="margin: 0; color: #a0aec0; font-size: 12px; text-align: center; line-height: 1.4;">
                    This email was sent to ${userEmail ? userEmail : 'your registered email address'}. 
                    This is an automated message, please do not reply to this email.
                  </p>
                  
                  <p style="margin: 12px 0 0 0; color: #a0aec0; font-size: 12px; text-align: center;">
                    © ${new Date().getFullYear()} ELTS App. All rights reserved.
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

const sendOtpEmail = async (toEmail, otp) => {
  const mailOptions = {
    from: `"Your App" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`, // Fallback for non-HTML clients
    html: generateOtpTemplate(otp),
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendOtpEmail };
