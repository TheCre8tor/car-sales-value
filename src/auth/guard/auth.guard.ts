import { CanActivate, ExecutionContext } from '@nestjs/common';

class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.session.userId;
  }
}

export default AuthGuard;
