const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { validateEnvVars } = require("./config/validateEnv");
const otpRoutes = require("./routes/otpRoutes");

dotenv.config();

// Validate environment variables
validateEnvVars();

const app = express();

// Connect to MongoDB
connectDB();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://your-frontend-domain.com"] // Add your frontend URL here
        : [
            "http://localhost:3000",
            "http://localhost:3001",
            "http://127.0.0.1:3000",
          ],
    credentials: true,
  })
);
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    message: "OTP Backend API is running!",
    status: "healthy",
    timestamp: new Date().toISOString(),
    endpoints: {
      sendOtp: "POST /api/otp/send",
      verifyOtp: "POST /api/otp/verify",
    },
  });
});

app.use("/api/otp", otpRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
