import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import CreateUserDto from '../dtos/create-user.dto';
import { UsersService } from '../service/users.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    await this.service.create(body.email, body.password);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    return await this.service.findOne(parseInt(id));
  }

  @Get()
  async findAllUsers(@Query('email') email: string) {
    return await this.service.find(email);
  }
}
