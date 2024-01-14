import { CanActivate, ExecutionContext } from '@nestjs/common';
import RequestSession from 'src/users/models/request.session';

class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestSession>();
    return !!request.session.userId;
  }
}

export default AuthGuard;
