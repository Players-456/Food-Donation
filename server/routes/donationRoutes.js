// server/routes/donationRoutes.js
const express = require("express");
const Donation = require("../models/Donation");
const upload = require("../middleware/upload");
const { authMiddleware, roleCheck } = require("../middleware/authMiddleware");
const { sendDonationConfirmation, sendNGOAlert, sendApprovalEmail, sendDeliveryEmail } = require("../utils/emailService");
const User = require("../models/User");

const router = express.Router();

/*
==============================
✅ PUBLIC STATS — no auth needed
==============================
*/
router.get("/stats", async (req, res) => {
  try {
    const [total, pending, approved, delivered] = await Promise.all([
      Donation.countDocuments(),
      Donation.countDocuments({ status: "Pending" }),
      Donation.countDocuments({ status: "Approved" }),
      Donation.countDocuments({ status: "Delivered" }),
    ]);
    res.json({ total, pending, approved, delivered });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

/*
==============================
1️⃣ DONOR → ADD DONATION
==============================
*/
router.post("/add", authMiddleware, roleCheck(["donor"]), upload.single("locationImage"), async (req, res) => {
  try {
    const { foodName, quantity, expiryDate, location } = req.body;
    const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

    const donation = new Donation({
      donor: req.user.id,
      foodName, quantity, expiryDate, location,
      locationImage: req.file ? req.file.filename : null,
      mapLink, status: "Pending"
    });

    await donation.save();

    try {
      const donor = await User.findById(req.user.id);

      // ✅ Fixed: pass as named object
      if (donor?.email) {
        sendDonationConfirmation({
          donorEmail: donor.email,
          donorName:  donor.name,
          foodName:   donation.foodName,
          quantity:   donation.quantity,
          location:   donation.location,
          mapLink:    donation.mapLink,
        });
      }

      const ngos = await User.find({ role: "ngo" });
      const ngoEmails = ngos.map(n => n.email).filter(Boolean);

      if (ngoEmails.length > 0) {
        sendNGOAlert({
          ngoEmails,
          donorName: donor?.name || "A donor",
          foodName:  donation.foodName,
          quantity:  donation.quantity,
          location:  donation.location,
          mapLink:   donation.mapLink,
        });
      }

    } catch (e) { console.log("Email error:", e.message); }

    res.status(201).json({ message: "Donation added successfully", donation });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

/*
==============================
2️⃣ VIEW DONATIONS (ALL)
==============================
*/
router.get("/", authMiddleware, async (req, res) => {
  try {
    const donations = await Donation.find().populate("donor", "name email role");
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

/*
==============================
3️⃣ NGO / ADMIN → APPROVE
==============================
*/
router.put("/approve/:id", authMiddleware, roleCheck(["ngo", "admin"]), async (req, res) => {
  try {
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status: "Approved" },
      { returnDocument: "after" }   // ✅ Fixed: Mongoose deprecation warning
    ).populate("donor", "name email");

    if (!donation) return res.status(404).json({ message: "Not found" });

    try {
      if (donation.donor?.email) {
        sendApprovalEmail({
          donorEmail: donation.donor.email,
          donorName:  donation.donor.name,
          foodName:   donation.foodName,
          quantity:   donation.quantity,
          location:   donation.location,
          mapLink:    donation.mapLink,
        });
      }
    } catch (e) { console.log("Email error:", e.message); }

    res.json({ message: "Donation approved", donation });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

/*
==============================
4️⃣ VOLUNTEER / ADMIN → DELIVER
==============================
*/
router.put("/deliver/:id", authMiddleware, roleCheck(["volunteer", "admin"]), async (req, res) => {
  try {
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status: "Delivered" },
      { returnDocument: "after" }   // ✅ Fixed: Mongoose deprecation warning
    ).populate("donor", "name email");

    if (!donation) return res.status(404).json({ message: "Not found" });

    try {
      if (donation.donor?.email) {
        sendDeliveryEmail({
          donorEmail: donation.donor.email,
          donorName:  donation.donor.name,
          foodName:   donation.foodName,
          quantity:   donation.quantity,
          location:   donation.location,
        });
      } else {
        console.log("⚠️ Donor email not found — delivery email skipped");
      }
    } catch (e) { console.log("Email error:", e.message); }

    res.json({ message: "Donation delivered", donation });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;