import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { UsersService } from 'src/users/service/users.service';
import { AuthService } from './service/auth.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
