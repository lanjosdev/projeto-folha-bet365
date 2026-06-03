import { Router } from 'express';
import { CreateMachineController } from '../controllers/create-machine.controller.js';
import { ListMachinesController } from '../controllers/list-machines.controller.js';
import { validate } from '../../../middlewares/validate.js';
import { apiTokenMiddleware } from '../../../middlewares/api-token.js';
import { createMachineSchema } from '../schemas/create-machine.schema.js';

const router = Router();
const createMachineController = new CreateMachineController();
const listMachinesController = new ListMachinesController();

router.post('/', apiTokenMiddleware, validate(createMachineSchema), createMachineController.handle.bind(createMachineController));
router.get('/', listMachinesController.handle.bind(listMachinesController));

export { router as machineRoutes };
