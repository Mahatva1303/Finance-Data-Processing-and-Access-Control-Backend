

const express = require("express");
const router = express.Router();


const { getSummary } = require("../controllers/recordController");


const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
  getCategoryTotals,
  getRecentActivity,
  getMonthlyTrends,
} = require("../controllers/recordController");

const { checkRole } = require("../middleware/roleMiddleware");

// Admin only
router.post("/", checkRole(["admin"]), createRecord);

// All roles can view
router.get("/", checkRole(["admin", "analyst", "viewer"]), getRecords);

// Admin only
router.put("/:id", checkRole(["admin"]), updateRecord);


router.get("/summary", checkRole(["admin", "analyst"]), getSummary);

router.get("/categories", checkRole(["admin", "analyst"]), getCategoryTotals);

router.get("/recent", checkRole(["admin", "analyst"]), getRecentActivity);

router.get("/trends/monthly", checkRole(["admin", "analyst"]), getMonthlyTrends);

// Admin only
router.delete("/:id", checkRole(["admin"]), deleteRecord);

module.exports = router;