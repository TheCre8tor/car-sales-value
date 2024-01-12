import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import CreateUserDto from '../dtos/create-user.dto';
import { UsersService } from '../service/users.service';
import UpdateUserDto from '../dtos/update-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  // 1. create ->

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    await this.service.create(body.email, body.password);
  }

  // 2. read ->

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.service.findOne(parseInt(id));

    const message = `user with the id: ${id} not found`;
    if (!user) throw new NotFoundException(message);

    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAllUsers(@Query('email') email: string) {
    return await this.service.find(email);
  }

  // 3. update ->

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.service.update(parseInt(id), body);
  }

  // 4. delete ->

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.service.remove(parseInt(id));
  }
}
