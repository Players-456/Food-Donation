require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ IMPORT ALL ROUTES
const authRoutes = require("./routes/authRoutes");
const donationRoutes = require("./routes/donationRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const contactRoutes = require("./routes/contactRoutes");

// ✅ MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

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
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/foodDonationDB")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log("MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;

// ✅ START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
