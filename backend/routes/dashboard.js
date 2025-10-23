const express = require("express");
const { authenticateToken } = require("../middleware/auth.js");
const router = express.Router();

// GET /api/dashboard/stats
router.get("/stats", authenticateToken, async (req, res) => {
  try {
    // Mock data - in a real app, this would come from database
    const stats = {
      totalUsers: 12584,
      totalRevenue: 42389,
      totalOrders: 2458,
      conversionRate: 3.25,
    };

    res.json(stats);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/dashboard/activity
router.get("/activity", authenticateToken, async (req, res) => {
  try {
    // Mock data - in a real app, this would come from database
    const activity = [
      {
        user: "John Doe",
        action: "Product Purchase",
        date: "2023-10-23",
        status: "Completed",
      },
      {
        user: "Sarah Smith",
        action: "Account Registration",
        date: "2023-10-22",
        status: "Completed",
      },
      {
        user: "Mike Johnson",
        action: "Payment Process",
        date: "2023-10-21",
        status: "Pending",
      },
      {
        user: "Emily Davis",
        action: "Product Review",
        date: "2023-10-20",
        status: "Completed",
      },
    ];

    res.json(activity);
  } catch (error) {
    console.error("Error fetching dashboard activity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
