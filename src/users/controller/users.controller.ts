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
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import UpdateUserDto from '../dtos/update-user.dto';
import UserDto from '../dtos/user.dto';
import { User } from '../entity/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import CurrentUser from '../decorators/current-user.decorator';

@Serialize(UserDto) // controller wide serialization ->
@Controller('user')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('/whoami')
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  // @Get('/whoami')
  // async whoAmI(@Session() session: any) {
  //   const user = await this.userService.findOne(session.userId);

  //   const message = 'User cannot be identified, please signin again';
  //   if (!user) throw new NotFoundException(message);

  //   return user;
  // }

  // # handler/route serialization
  // @Serialize(UserDto)
  @Get('/:id')
  async findUser(@Param('id') id: string): Promise<User> {
    const user = await this.service.findOne(parseInt(id));

    const message = `user with the id: ${id} not found`;
    if (!user) throw new NotFoundException(message);

    return user;
  }

  @Get()
  async findAllUsers(@Query('email') email: string): Promise<User[]> {
    return await this.service.find(email);
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.service.update(parseInt(id), body);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.service.remove(parseInt(id));
  }
}
