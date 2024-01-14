import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from '../entity/report.entity';
import { Repository } from 'typeorm';
import CreateReportDto from '../dto/create-report.dto';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class ReportsService {
  private readonly repository: Repository<Report>;

  constructor(@InjectRepository(Report) repository: Repository<Report>) {
    this.repository = repository;
  }

  async create(dto: CreateReportDto, user: User) {
    const report = this.repository.create(dto);
    report.user = user;
    return this.repository.save(report);
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repository.findOne({
      where: { id: id },
    });

    if (!report) throw new NotFoundException('report not found');

    report.approved = approved;
    return this.repository.save(report);
  }
}
