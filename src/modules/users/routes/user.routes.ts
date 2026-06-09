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

userRoutes.post('/', createUserController.handle);
userRoutes.get('/', listUsersController.handle);
userRoutes.get('/:id', getUserController.handle);
userRoutes.put('/:id', updateUserController.handle);
userRoutes.delete('/:id', deleteUserController.handle);

export { userRoutes };
