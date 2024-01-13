import { Body, Controller, Post } from '@nestjs/common';
import { ReportsService } from '../service/reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  @Post()
  createReport(@Body() body: CreateReportDto) {}
}
