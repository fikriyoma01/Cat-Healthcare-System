const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const groomingRoutes = require('./routes/grooming');
const appointmentRoutes = require('./routes/appointments');
const boardingRoutes = require('./routes/boardings');
const infographicRoutes = require('./routes/infographics');
const financialReportRoutes = require('./routes/finance');
const doctorRoutes = require('./routes/doctors');
const performanceRoutes = require('./routes/performance');
const articleRoutes = require('./routes/articles');
const path = require('path');
const fs = require('fs');


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/cat-healthcare', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Routes
app.get('/', (req, res) => {
  res.send('Cat Healthcare System API');
});

app.use('/api/users', userRoutes);
app.use('/api/grooming', groomingRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/boarding', boardingRoutes);
app.use('/api/infographics', infographicRoutes); 
app.use('/api/finance', financialReportRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/articles', articleRoutes);

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
