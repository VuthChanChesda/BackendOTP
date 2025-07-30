const validateEnvVars = () => {
  const requiredVars = ["MONGODB_URI", "EMAIL_USER", "EMAIL_PASS"];

  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error("❌ Missing required environment variables:");
    missingVars.forEach((varName) => {
      console.error(`   - ${varName}`);
    });
    console.error(
      "\nPlease check your .env file or environment configuration."
    );
    process.exit(1);
  }

  console.log("✅ All required environment variables are set");
};

module.exports = { validateEnvVars };
