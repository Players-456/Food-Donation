require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// ✅ IMPORT ALL ROUTES
const authRoutes = require("./routes/authRoutes");
const donationRoutes = require("./routes/donationRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const contactRoutes = require("./routes/contactRoutes");

// ✅ CORS CONFIGURATION - Production Ready
const allowedOrigins = [
  "http://localhost:3000",      // Development
  "http://localhost:5000",      // Local API
  "https://food-donation-client.vercel.app",  // Production Frontend (change to your Vercel URL)
  process.env.FRONTEND_URL      // Environment variable for Frontend URL
].filter(Boolean); // Remove undefined values

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// ✅ MIDDLEWARES
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ SERVE UPLOADS FOLDER - Using absolute path for reliability
const uploadsPath = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsPath));

// ✅ ROUTES (VERY IMPORTANT — you missed these earlier)
app.use("/api/auth", authRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/contact", contactRoutes);

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Smart Food Donation Backend Running");
});

// ✅ MONGODB CONNECTION
if (!process.env.MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI environment variable is not set. Please check your .env file.");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;

// ✅ START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
