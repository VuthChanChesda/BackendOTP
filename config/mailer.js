const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // For production SSL issues
  },
  pool: true, // Use connection pooling
  maxConnections: 5, // Max concurrent connections
  maxMessages: 100, // Max messages per connection
  rateLimit: 14, // Max 14 messages per second
});

// Verify transporter configuration
if (process.env.NODE_ENV !== "test") {
  transporter.verify((error, success) => {
    if (error) {
      console.error("❌ Email transporter configuration error:", error);
    } else {
      console.log("✅ Email transporter is ready for production");
    }
  });
}

module.exports = transporter;
