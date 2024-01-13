import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReportsService } from '../service/reports.service';
import CreateReportDto from '../dto/create-report.dto';
import AuthGuard from 'src/auth/guard/auth.guard';

@Controller('reports')
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto) {
    return this.service.create(body);
  }
}
