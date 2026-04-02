const Record = require("../models/Record");

// CREATE RECORD
exports.createRecord = async (req, res) => {
  try {
    const { amount, type, category } = req.body;

    // VALIDATION
    if (!amount || !type || !category) {
      return res.status(400).json({
        message: "Amount, type and category are required",
      });
    }

    const record = await Record.create({
      ...req.body,
      createdBy: req.body.userId,
    });

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET RECORDS + FILTER + PAGINATION 🔥
exports.getRecords = async (req, res) => {
  try {
    const {
      type,
      category,
      startDate,
      endDate,
      page = 1,
      limit = 5,
    } = req.query;

    let filter = {};

    if (type) filter.type = type;
    if (category) filter.category = category;

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const skip = (page - 1) * limit;

    const records = await Record.find(filter)
      .skip(skip)
      .limit(Number(limit));

    const total = await Record.countDocuments(filter);

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: records,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE RECORD
exports.updateRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    const updated = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE RECORD
exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    await Record.findByIdAndDelete(req.params.id);

    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DASHBOARD SUMMARY
exports.getSummary = async (req, res) => {
  try {
    const records = await Record.find();

    let totalIncome = 0;
    let totalExpense = 0;

    records.forEach((rec) => {
      if (rec.type === "income") totalIncome += rec.amount;
      else totalExpense += rec.amount;
    });

    const netBalance = totalIncome - totalExpense;

    res.json({
      totalIncome,
      totalExpense,
      netBalance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CATEGORY-WISE TOTALS
exports.getCategoryTotals = async (req, res) => {
  try {
    const result = await Record.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// RECENT ACTIVITY
exports.getRecentActivity = async (req, res) => {
  try {
    const records = await Record.find()
      .sort({ date: -1 })
      .limit(5);

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// MONTHLY TRENDS
exports.getMonthlyTrends = async (req, res) => {
  try {
    const trends = await Record.aggregate([
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: { "_id": 1 },
      },
    ]);

    res.json(trends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};