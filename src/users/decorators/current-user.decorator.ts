import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    // 1. the ``context`` is a wrapper around incoming request

    // 2. the data parameter is whatever we pass as an argument
    // through the decorator invokation: @CurrentUser(value)

    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);

export default CurrentUser;
