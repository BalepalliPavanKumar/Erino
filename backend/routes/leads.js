const express = require("express");
const Lead = require("../models/lead");
const auth = require("../middleware/auth");
const { Types } = require("mongoose");

const router = express.Router();


router.post("/", auth, async (req, res) => {
  try {
    const lead = await Lead.create({ ...req.body, owner: req.user.id });
    res.status(201).json(lead);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});


router.get("/", auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const total = await Lead.countDocuments({ owner: req.user.id });

    const leads = await Lead.find({ owner: req.user.id })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 }); 

    const data = leads.map(lead => {
      const fullName = lead.name || '';
      const [first_name, ...rest] = fullName.split(' ');
      const last_name = rest.join(' ');
      return { ...lead._doc, first_name, last_name };
    });

    res.json({
      data,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalLeads: total
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/:id", auth, async (req, res) => {
  if (!Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ message: "Invalid ID" });
  const lead = await Lead.findOne({ _id: req.params.id, owner: req.user.id });
  if (!lead) return res.status(404).json({ message: "Not found" });
  res.json(lead);
});


router.put("/:id", auth, async (req, res) => {
  const lead = await Lead.findOneAndUpdate(
    { _id: req.params.id, owner: req.user.id },
    req.body,
    { new: true }
  );
  if (!lead) return res.status(404).json({ message: "Not found" });
  res.json(lead);
});


router.delete("/:id", auth, async (req, res) => {
  const lead = await Lead.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
  if (!lead) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
});

module.exports = router;
