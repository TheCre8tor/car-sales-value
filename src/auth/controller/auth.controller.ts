import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import CreateUserDto from 'src/users/dtos/create-user.dto';
import SigninDto from '../dto/signin.dto';
import { User } from 'src/users/entity/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import UserDto from 'src/users/dtos/user.dto';

@Serialize(UserDto)
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    await this.service.signup(body);
  }

  @Post('/signin')
  async signin(@Body() body: SigninDto): Promise<User> {
    return await this.service.signin(body.email, body.password);
  }
}
