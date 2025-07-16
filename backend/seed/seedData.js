const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const JobRequisition = require('../models/JobRequisition');
const Notification = require('../models/Notification');
const OverrideAction = require('../models/OverrideAction');
const User = require('../models/User');

mongoose.connect('mongodb://localhost:27017/recruitment', { useNewUrlParser: true, useUnifiedTopology: true });

async function seed() {
  await JobRequisition.deleteMany({});
  await Notification.deleteMany({});
  await OverrideAction.deleteMany({});
  await User.deleteMany({});

  await JobRequisition.create([
    { title: 'Software Engineer', department: 'Engineering', status: 'Pending', created_by: 'admin' },
    { title: 'Data Analyst', department: 'Analytics', status: 'Pending', created_by: 'admin' }
  ]);

  await Notification.create([
    { type: 'info', message: 'New candidate applied to Software Engineer' },
    { type: 'warning', message: 'Job Requisition #102 pending review' }
  ]);

  await OverrideAction.create([
    { type: 'CandidateShortlist', entityId: '201', previousStatus: 'Rejected', newStatus: 'Shortlisted', performedBy: 'hr@company.com', reason: 'Exceptional profile' }
  ]);

  const passwordHash = await bcrypt.hash('password123', 10);
  await User.create([
    { email: 'hr@company.com', password: passwordHash, role: 'HR' },
    { email: 'admin@company.com', password: passwordHash, role: 'Admin' }
  ]);

  console.log('Database seeded');
  process.exit();
  const mongoose = require('mongoose');
    mongoose.connection.close();
}

seed();
