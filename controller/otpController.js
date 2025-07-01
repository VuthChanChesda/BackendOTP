const { sendOtpEmail } = require("../services/mailService");
const OTP = require("../models/otpModel");

// Generate and send OTP
const sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // Delete any existing OTPs for this email
    await OTP.deleteMany({ email });

    // Save new OTP
    const newOtp = new OTP({ email, otp });
    await newOtp.save();

    await sendOtpEmail(email, otp);
    res.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to send OTP",
        error: err.message,
      });
  }
};

// Verify OTP
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp)
    return res.status(400).json({ message: "Email and OTP are required" });

  try {
    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    // OTP is valid, delete it
    await OTP.deleteMany({ email });
    res.json({ success: true, message: "OTP verified successfully" });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Verification failed",
        error: err.message,
      });
  }
};

module.exports = { sendOtp, verifyOtp };
