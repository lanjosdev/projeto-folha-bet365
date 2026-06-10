import { Router } from 'express';
import { CreateMachineController } from '../controllers/create-machine.controller.js';
import { ListMachinesController } from '../controllers/list-machines.controller.js';
import { ArchiveMachineController } from '../controllers/archive-machine.controller.js';
import { RestoreMachineController } from '../controllers/restore-machine.controller.js';
import { DeleteMachineController } from '../controllers/delete-machine.controller.js';
import { validate } from '../../../middlewares/validate.js';
import { apiTokenMiddleware } from '../../../middlewares/api-token.js';
import { ensureAuthenticated } from '../../../middlewares/ensure-authenticated.js';
import { createMachineSchema } from '../schemas/create-machine.schema.js';

const router = Router();
const createMachineController = new CreateMachineController();
const listMachinesController = new ListMachinesController();
const archiveMachineController = new ArchiveMachineController();
const restoreMachineController = new RestoreMachineController();
const deleteMachineController = new DeleteMachineController();

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
 *                 status: "ACTIVE"
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
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', apiTokenMiddleware, validate(createMachineSchema), createMachineController.handle.bind(createMachineController));

/**
 * @swagger
 * /api/v1/machines:
 *   get:
 *     summary: Lista as máquinas ativas com paginação
 *     tags: [Machines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Itens por página
 *     responses:
 *       200:
 *         description: Retorna a lista de máquinas
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 results:
 *                   - id: "maquina-front-01"
 *                     status: "ACTIVE"
 *                     createdAt: "2026-06-03T18:00:00.000Z"
 *                 meta:
 *                   total: 1
 *                   page: 1
 *                   limit: 10
 *                   totalPages: 1
 *       401:
 *         description: Token ausente ou inválido
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Token de autenticação ausente"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Ocorreu um erro interno no servidor."
 */
router.get('/', ensureAuthenticated, listMachinesController.handle.bind(listMachinesController));

/**
 * @swagger
 * /api/v1/machines/{id}/archive:
 *   patch:
 *     summary: Arquiva uma máquina (Soft Delete)
 *     tags: [Machines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da máquina
 *     responses:
 *       200:
 *         description: Máquina arquivada com sucesso
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Máquina arquivada com sucesso"
 *       401:
 *         description: Token ausente ou inválido
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Token de autenticação ausente"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Ocorreu um erro interno no servidor."
 */
router.patch('/:id/archive', ensureAuthenticated, archiveMachineController.handle.bind(archiveMachineController));

/**
 * @swagger
 * /api/v1/machines/{id}/restore:
 *   patch:
 *     summary: Restaura uma máquina arquivada (Desarquivar)
 *     tags: [Machines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da máquina
 *     responses:
 *       200:
 *         description: Máquina ativada com sucesso
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Máquina ativada com sucesso"
 *       401:
 *         description: Token ausente ou inválido
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Token de autenticação ausente"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Ocorreu um erro interno no servidor."
 */
router.patch('/:id/restore', ensureAuthenticated, restoreMachineController.handle.bind(restoreMachineController));

/**
 * @swagger
 * /api/v1/machines/{id}:
 *   delete:
 *     summary: Exclui uma máquina (Hard Delete)
 *     tags: [Machines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da máquina
 *     responses:
 *       200:
 *         description: Máquina excluída com sucesso
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Máquina excluída com sucesso"
 *       401:
 *         description: Token ausente ou inválido
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Token de autenticação ausente"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Ocorreu um erro interno no servidor."
 */
router.delete('/:id', ensureAuthenticated, deleteMachineController.handle.bind(deleteMachineController));

export { router as machineRoutes };
