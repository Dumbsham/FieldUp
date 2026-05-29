const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');
const errorHandler = require('./middleware/error');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

// Route files
const teamRoutes = require('./routes/teamRoutes');
const playerRoutes = require('./routes/playerRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'FieldUp Backend is running' });
});

// Mount routers
app.use('/api/teams', teamRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/auth', authRoutes);

// --- API Route Stubs ---

// Match & Performance Routes
app.post('/api/matches', (req, res) => res.status(501).json({ message: 'Not Implemented' }));
app.get('/api/matches', (req, res) => res.status(501).json({ message: 'Not Implemented' }));
app.get('/api/matches/:id', (req, res) => res.status(501).json({ message: 'Not Implemented' }));
app.post('/api/performance', (req, res) => res.status(501).json({ message: 'Not Implemented' }));
app.post('/api/fitness', (req, res) => res.status(501).json({ message: 'Not Implemented' }));

// AI Routes
app.post('/api/ai/match-strategy', (req, res) => res.status(501).json({ message: 'Not Implemented' }));
app.get('/api/ai/injury-risk/:playerId', (req, res) => res.status(501).json({ message: 'Not Implemented' }));
app.get('/api/ai/performance-insights/:playerId', (req, res) => res.status(501).json({ message: 'Not Implemented' }));

// ------------------------

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

  if (require.main === module) {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    });
  }

module.exports = app;
