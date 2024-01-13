import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import CreateUserDto from 'src/users/dtos/create-user.dto';
import SigninDto from '../dto/signin.dto';
import { User } from 'src/users/entity/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import UserDto from 'src/users/dtos/user.dto';
import { UsersService } from 'src/users/service/users.service';

@Serialize(UserDto)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async createUser(
    @Body() body: CreateUserDto,
    @Session() session: any,
  ): Promise<User> {
    const user = await this.authService.signup(body);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(
    @Body() body: SigninDto,
    @Session() session: any,
  ): Promise<User> {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
  }
}
