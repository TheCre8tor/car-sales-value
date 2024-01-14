import { CanActivate, ExecutionContext } from '@nestjs/common';
import RequestSession from 'src/users/models/request.session';

class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestSession>();
    const userIsAdmin = request.session.userId && request.currentUser.is_admin;

    return userIsAdmin;
  }
}

export default AdminGuard;
