const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    foodName: String,
    quantity: String,
    expiryDate: Date,
    location: String,

    // 🔹 NEW FIELDS
    locationImage: String,   // image filename / URL
    mapLink: String,         // Google Maps link

    status: {
      type: String,
      enum: ["Pending", "Approved", "Delivered"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);
