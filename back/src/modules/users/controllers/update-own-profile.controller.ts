import type { Request, Response, NextFunction } from 'express';
import { UpdateOwnProfileService } from '../services/update-own-profile.service.js';
import { updateProfileSchema } from '../schemas/user.schema.js';
import { HttpHelper } from '../../../utils/http.js';

export class UpdateOwnProfileController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.user!.id;
      const data = updateProfileSchema.parse(req.body);
      const updateOwnProfileService = new UpdateOwnProfileService();
      const user = await updateOwnProfileService.execute(id, data);
      
      const response = HttpHelper.ok({ data: user });
      res.status(response.statusCode).json(response.body);
    } catch (error) {
      next(error);
    }
  }
}
