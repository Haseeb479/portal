require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const hrDashboardRoutes = require('./routes/hrDashboard');
const overrideRoutes = require('./routes/override');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/recruitment';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/hr-dashboard', hrDashboardRoutes);
app.use('/api/override', overrideRoutes);
app.use('/api/auth', authRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
