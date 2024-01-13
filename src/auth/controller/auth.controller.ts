import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Session,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import CreateUserDto from 'src/users/dtos/create-user.dto';
import SigninDto from '../dto/signin.dto';
import { User } from 'src/users/entity/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import UserDto from 'src/users/dtos/user.dto';
import { UsersService } from 'src/users/service/users.service';
import CurrentUser from 'src/users/decorators/current-user.decorator';

@Serialize(UserDto)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

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

  // @Get('/whoami')
  // async whoAmI(@Session() session: any) {
  //   const user = await this.userService.findOne(session.userId);

  //   const message = 'User cannot be identified, please signin again';
  //   if (!user) throw new NotFoundException(message);

  //   return user;
  // }

  @Get('/whoami')
  whoAmI(@CurrentUser() user: string) {
    console.log(user);
  }

  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
  }
}
