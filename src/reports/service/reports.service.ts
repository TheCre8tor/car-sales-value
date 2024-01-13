import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from '../entity/report.entity';
import { Repository } from 'typeorm';
import CreateReportDto from '../dto/create-report.dto';

@Injectable()
export class ReportsService {
  private readonly repository: Repository<Report>;

  constructor(@InjectRepository(Report) repository: Repository<Report>) {
    this.repository = repository;
  }

  async create(dto: CreateReportDto) {
    const report = this.repository.create(dto);
    return this.repository.save(report);
  }
}
