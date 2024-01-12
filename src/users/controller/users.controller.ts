import { Controller, Post, Body } from '@nestjs/common';
import CreateUserDto from '../dtos/create-user.dto';
import { UsersService } from '../service/users.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    await this.service.create(body.email, body.password);
  }
}
