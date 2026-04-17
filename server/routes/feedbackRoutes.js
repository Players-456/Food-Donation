const express = require("express");
const Feedback = require("../models/Feedback");
const { authMiddleware, roleCheck } = require("../middleware/authMiddleware");

const router = express.Router();

/*
==============================
1. ADD FEEDBACK (ALL USERS)
==============================
*/
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const feedback = new Feedback({
      user: req.user.id,
      role: req.user.role,
      rating,
      comment
    });

    await feedback.save();

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error
    });
  }
});

/*
==============================
2. GET ALL FEEDBACK (ADMIN)
==============================
*/
router.get(
  "/",
  authMiddleware,
  roleCheck(["admin"]),
  async (req, res) => {
    try {
      const feedbacks = await Feedback.find()
        .populate("user", "name email role")
        .sort({ createdAt: -1 });

      res.json(feedbacks);
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        error
      });
    }
  }
);

module.exports = router;
