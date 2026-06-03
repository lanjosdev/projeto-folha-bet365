import express from 'express';
import { errorHandler } from './middlewares/error-handler.js';
import { machineRoutes } from './modules/machines/routes/machine.routes.js';

export const app = express();

app.use(express.json());

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/machines', machineRoutes);

app.use(errorHandler);
