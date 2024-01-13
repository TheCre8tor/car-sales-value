import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import CreateUserDto from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/service/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private readonly service: UsersService) {}

  async signup(dto: CreateUserDto) {
    // see if email is in user
    const users = await this.service.find(dto.email);

    const message = 'email in use';
    if (users.length !== 0) throw new BadRequestException(message);

    // hash the users password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(dto.password, salt, 32)) as Buffer;
    const result = `${salt}.${hash.toString('hex')}`;

    // create a new user and save it
    const user = this.service.create(dto.email, result);

    // return the user
    return user;
  }

  async signin(email: string, password: string) {
    const user = await this.service.findOneByEmail(email);

    if (!user) throw new NotFoundException('user not found');

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const isWrongPassword = storedHash !== hash.toString('hex');

    const message = 'wrong email or password';
    if (isWrongPassword) throw new BadRequestException(message);

    return user;
  }
}
