import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from '../entity/report.entity';
import { Repository } from 'typeorm';
import CreateReportDto from '../dto/create-report.dto';
import { User } from 'src/users/entity/user.entity';
import GetEstimateDto from '../dto/get-estimate.dto';

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

  async createEstimate(dto: GetEstimateDto) {
    const query = this.repository.createQueryBuilder();
    const { make, model, lng, lat, year, mileage } = dto;

    const report: Report = await query
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();

    return report;
  }
}
