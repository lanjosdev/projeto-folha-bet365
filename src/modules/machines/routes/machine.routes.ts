import { Router } from 'express';
import { CreateMachineController } from '../controllers/create-machine.controller.js';
import { ListMachinesController } from '../controllers/list-machines.controller.js';
import { validate } from '../../../middlewares/validate.js';
import { apiTokenMiddleware } from '../../../middlewares/api-token.js';
import { ensureAuthenticated } from '../../../middlewares/ensure-authenticated.js';
import { createMachineSchema } from '../schemas/create-machine.schema.js';

const router = Router();
const createMachineController = new CreateMachineController();
const listMachinesController = new ListMachinesController();

/**
 * @swagger
 * /api/v1/machines:
 *   post:
 *     summary: Cadastra uma nova máquina
 *     tags: [Machines]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 example: "maquina-front-01"
 *     responses:
 *       201:
 *         description: Máquina cadastrada com sucesso
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Criado com sucesso!"
 *               data:
 *                 id: "maquina-front-01"
 *                 createdAt: "2026-06-03T18:00:00.000Z"
 *       400:
 *         description: Payload inválido
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Payload inválido."
 *               issues:
 *                 id: ["O ID da máquina não pode estar vazio"]
 *       401:
 *         description: Token ausente ou inválido
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Token de autenticação ausente"
 *       409:
 *         description: Máquina já cadastrada
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Máquina já cadastrada"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Ocorreu um erro interno no servidor."
 */
router.post('/', apiTokenMiddleware, validate(createMachineSchema), createMachineController.handle.bind(createMachineController));

/**
 * @swagger
 * /api/v1/machines:
 *   get:
 *     summary: Lista todas as máquinas
 *     tags: [Machines]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna a lista de máquinas ordenadas pela data de criação
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - id: "maquina-front-01"
 *                   createdAt: "2026-06-03T18:00:00.000Z"
 *       401:
 *         description: Token ausente ou inválido
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Token JWT inválido ou ausente"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Ocorreu um erro interno no servidor."
 */
router.get('/', ensureAuthenticated, listMachinesController.handle.bind(listMachinesController));

export { router as machineRoutes };
