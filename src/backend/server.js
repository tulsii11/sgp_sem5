import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import placementRoutes from './routes/placementRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', placementRoutes);

// Health Check Endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'CampusHire Backend API Server is running simultaneously 🚀',
    timestamp: new Date().toISOString()
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 CampusHire Backend API running on http://localhost:${PORT}`);
  console.log(`==================================================\n`);
});
