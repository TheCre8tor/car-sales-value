import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from '../service/users.service';
import { User } from '../entity/user.entity';

// note: for class functionality extension.
// added currentUser to the Express Request interface
declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly service: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    const user = await this.service.findOne(userId);

    if (!user) throw new NotFoundException('user not found');

    req.currentUser = user;

    next();
  }
}

export default CurrentUserMiddleware;
