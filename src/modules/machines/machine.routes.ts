import { Router } from 'express';
import { MachineController } from './machine.controller.js';
import { validate } from '../../middlewares/validate.js';
import { createMachineSchema } from './machine.schema.js';

const router = Router();
const controller = new MachineController();

router.post('/', validate(createMachineSchema), controller.create);
router.get('/', controller.list);

export { router as machineRoutes };
