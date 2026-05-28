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

// --- API Route Stubs ---

// Auth Routes
app.post('/api/auth/register', (req, res) => res.status(501).json({ message: 'Not Implemented' }));
app.post('/api/auth/login', (req, res) => res.status(501).json({ message: 'Not Implemented' }));
app.get('/api/auth/me', (req, res) => res.status(501).json({ message: 'Not Implemented' }));

// Team Routes
app.post('/api/teams', (req, res) => res.status(501).json({ message: 'Not Implemented' }));
app.get('/api/teams/:id', (req, res) => res.status(501).json({ message: 'Not Implemented' }));
app.get('/api/teams/:teamId/players', (req, res) => res.status(501).json({ message: 'Not Implemented' }));

// Player Routes
app.post('/api/players', (req, res) => res.status(501).json({ message: 'Not Implemented' }));
app.get('/api/players/:id', (req, res) => res.status(501).json({ message: 'Not Implemented' }));

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
