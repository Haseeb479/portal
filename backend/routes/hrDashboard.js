const express = require('express');
const JobRequisition = require('../models/JobRequisition');
const Notification = require('../models/Notification');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth');

// GET overview stats
router.get('/overview', authMiddleware(['HR', 'Admin']), async (req, res) => {
  const pendingReq = await JobRequisition.countDocuments({ status: 'Pending' });
  const activeJobs = 5;
  const candidatesInProcess = 12;
  res.json({
    stats: {
      pendingRequisitions: pendingReq,
      activeJobs,
      candidatesInProcess
    }
  });
});

// GET pending job requisitions
router.get('/job-requisitions', authMiddleware(['HR', 'Admin']), async (req, res) => {
  const reqs = await JobRequisition.find({ status: 'Pending' }).sort({ submitted_at: -1 });
  res.json(reqs);
});

// Approve requisition
router.post('/job-requisitions/:id/approve', authMiddleware(['HR']), async (req, res) => {
  await JobRequisition.findByIdAndUpdate(req.params.id, { status: 'Approved', reviewed_by: req.user.email, review_status: 'Approved' });
  await Notification.create({ type: 'info', message: `Job Requisition #${req.params.id} approved.` });
  res.json({ success: true });
});

// Reject requisition
router.post('/job-requisitions/:id/reject', authMiddleware(['HR']), async (req, res) => {
  await JobRequisition.findByIdAndUpdate(req.params.id, { status: 'Rejected', reviewed_by: req.user.email, review_status: 'Rejected' });
  await Notification.create({ type: 'warning', message: `Job Requisition #${req.params.id} rejected.` });
  res.json({ success: true });
});

// Get notifications
router.get('/notifications', authMiddleware(['HR', 'Admin']), async (req, res) => {
  const notes = await Notification.find({}).sort({ time: -1 }).limit(10);
  res.json(notes);
});

module.exports = router;
