import { Router } from 'express';
import { LoginController } from '../controllers/login.controller.js';

const authRoutes = Router();
const loginController = new LoginController();

authRoutes.post('/login', loginController.handle);

export { authRoutes };
