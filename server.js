const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const otpRoutes = require('./routes/otpRoutes');

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/otp', otpRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
