import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReportsService } from '../service/reports.service';
import CreateReportDto from '../dto/create-report.dto';
import AuthGuard from 'src/auth/guard/auth.guard';
import CurrentUser from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/entity/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import ReportDto from '../dto/report.dto';
import { Report } from '../entity/report.entity';

@Controller('reports')
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(
    @Body() body: CreateReportDto,
    @CurrentUser() user: User,
  ): Promise<Report> {
    return this.service.create(body, user);
  }
}
