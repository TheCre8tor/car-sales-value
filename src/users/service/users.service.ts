import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: number) {
    return await this.repository.findOneBy({ id });
  }

  async findOneByEmail(email: string) {
    return await this.repository.findOneBy({ email });
  }

  async find(email: string) {
    return await this.repository.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('user not found');

    // this object copy the differences in the data
    // of attrs into the user object
    Object.assign(user, attrs);

    this.repository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('user not found');

    return await this.repository.remove(user);
  }
}
