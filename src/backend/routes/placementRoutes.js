import express from 'express';
import {
  getHealthCheck,
  predictPlacement,
  getStudentProfile
} from '../controllers/placementController.js';

const router = express.Router();

// GET /api/health
router.get('/health', getHealthCheck);

// GET /api/student/profile
router.get('/student/profile', getStudentProfile);

// POST /api/predict-placement
router.post('/predict-placement', predictPlacement);

export default router;
