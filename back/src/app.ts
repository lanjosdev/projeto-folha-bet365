import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';
import { errorHandler } from './middlewares/error-handler.js';
import { machineRoutes } from './modules/machines/routes/machine.routes.js';
import { authRoutes } from './modules/auth/routes/auth.routes.js';
import { userRoutes } from './modules/users/routes/user.routes.js';

export const app = express();

app.use(cors());
app.use(express.json());

// Swagger Docs
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/machines', machineRoutes);

app.use(errorHandler);
