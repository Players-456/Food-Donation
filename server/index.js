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

// ✅ ALLOWED ORIGINS
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5000",
  "https://food-donation-client.vercel.app",
  process.env.FRONTEND_URL
].filter(Boolean);

// ✅ CORS CONFIGURATION (FIXED)
const corsOptions = {
  origin: function (origin, callback) {
    console.log("🌍 Incoming Origin:", origin); // DEBUG

    // ✅ Allow requests with no origin (Postman, mobile apps)
    if (!origin) {
      return callback(null, true);
    }

    // ✅ Allow exact matches
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // ✅ Allow ALL Vercel deployments (preview + production)
    if (origin.includes("vercel.app")) {
      return callback(null, true);
    }

    // ❌ Block everything else
    console.log("❌ Blocked by CORS:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200
};

// ✅ APPLY MIDDLEWARES
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ SERVE UPLOADS
const uploadsPath = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsPath));

// ✅ ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/contact", contactRoutes);

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Smart Food Donation Backend Running 🚀");
});

// ✅ CHECK ENV VARIABLES
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI missing in .env");
  process.exit(1);
}

// ✅ CONNECT MONGODB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  });

// ✅ START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});