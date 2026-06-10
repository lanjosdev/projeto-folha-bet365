import { Router } from 'express';
import { LoginController } from '../controllers/login.controller.js';

const authRoutes = Router();
const loginController = new LoginController();

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Autentica um usuário e retorna um token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "admin@admin.com"
 *               password:
 *                 type: string
 *                 example: "admin123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 user:
 *                   id: "550e8400-e29b-41d4-a716-446655440000"
 *                   name: "Administrador"
 *                   email: "admin@admin.com"
 *                   createdAt: "2026-06-03T18:00:00.000Z"
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: E-mail ou senha incorretos
 *       400:
 *         description: Payload inválido
 */
authRoutes.post('/login', loginController.handle);

export { authRoutes };
