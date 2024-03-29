import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../service/users.service';
import RequestSession from '../models/request.session';

@Injectable()
class CurrentUserInterceptor implements NestInterceptor {
  constructor(private readonly service: UsersService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<RequestSession>();
    const { userId } = request.session || {};

    if (userId) {
      const user = await this.service.findOne(userId);
      request.currentUser = user;
    }

    return next.handle();
  }
}

export default CurrentUserInterceptor;
