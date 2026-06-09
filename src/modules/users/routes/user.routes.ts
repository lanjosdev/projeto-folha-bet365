import { Router } from 'express';
import { CreateUserController } from '../controllers/create-user.controller.js';
import { ListUsersController } from '../controllers/list-users.controller.js';
import { GetUserController } from '../controllers/get-user.controller.js';
import { UpdateUserController } from '../controllers/update-user.controller.js';
import { DeleteUserController } from '../controllers/delete-user.controller.js';
import { ensureAuthenticated } from '../../../middlewares/ensure-authenticated.js';

const userRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const getUserController = new GetUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

// The ensureAuthenticated middleware will be implemented in Phase 4.
// For now we'll import it and use it, the compiler might complain until Phase 4.
userRoutes.use(ensureAuthenticated);

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "joao@exemplo.com"
 *               password:
 *                 type: string
 *                 example: "senhaForte123"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Criado com sucesso!"
 *               data:
 *                 id: "550e8400-e29b-41d4-a716-446655440000"
 *                 name: "João Silva"
 *                 email: "joao@exemplo.com"
 *                 createdAt: "2026-06-03T18:00:00.000Z"
 *                 updatedAt: "2026-06-03T18:00:00.000Z"
 *       409:
 *         description: E-mail já está em uso
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "E-mail já está em uso"
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Invalid JWT token"
 *       400:
 *         description: Payload inválido
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Payload inválido."
 *               issues:
 *                 email: ["Email inválido"]
 */
userRoutes.post('/', createUserController.handle);

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna a lista de usuários
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - id: "550e8400-e29b-41d4-a716-446655440000"
 *                   name: "João Silva"
 *                   email: "joao@exemplo.com"
 *                   createdAt: "2026-06-03T18:00:00.000Z"
 *                   updatedAt: "2026-06-03T18:00:00.000Z"
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Invalid JWT token"
 */
userRoutes.get('/', listUsersController.handle);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Detalhes do usuário
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: "550e8400-e29b-41d4-a716-446655440000"
 *                 name: "João Silva"
 *                 email: "joao@exemplo.com"
 *                 createdAt: "2026-06-03T18:00:00.000Z"
 *                 updatedAt: "2026-06-03T18:00:00.000Z"
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Usuário não encontrado"
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Invalid JWT token"
 */
userRoutes.get('/:id', getUserController.handle);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Atualiza os dados de um usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João Silva Atualizado"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "joao2@exemplo.com"
 *               password:
 *                 type: string
 *                 example: "novaSenha123"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: "550e8400-e29b-41d4-a716-446655440000"
 *                 name: "João Silva Atualizado"
 *                 email: "joao2@exemplo.com"
 *                 createdAt: "2026-06-03T18:00:00.000Z"
 *                 updatedAt: "2026-06-09T18:00:00.000Z"
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Usuário não encontrado"
 *       409:
 *         description: E-mail já está em uso
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "E-mail já está em uso"
 */
userRoutes.put('/:id', updateUserController.handle);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Deleta um usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Deletado com sucesso"
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Usuário não encontrado"
 */
userRoutes.delete('/:id', deleteUserController.handle);

export { userRoutes };
