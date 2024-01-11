import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  private readonly repository: Repository<User>;

  constructor(@InjectRepository(User) repository: Repository<User>) {
    this.repository = repository;
  }

  async create(email: string, password: string): Promise<User> {
    const user = this.repository.create({ email, password });
    return await this.repository.save(user);
  }
}
