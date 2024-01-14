import {
  Body,
  Controller,
  Post,
  Patch,
  Param,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { ReportsService } from '../service/reports.service';
import CreateReportDto from '../dto/create-report.dto';
import AuthGuard from 'src/auth/guard/auth.guard';
import CurrentUser from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/entity/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import ReportDto from '../dto/report.dto';
import { Report } from '../entity/report.entity';
import ApproveReportDto from '../dto/approve-report.dto';
import AdminGuard from 'src/auth/guard/admin.guard';
import GetEstimateDto from '../dto/get-estimate.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  @Get()
  async getEstimate(@Query() query: GetEstimateDto) {
    return this.service.createEstimate(query);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  async createReport(
    @Body() body: CreateReportDto,
    @CurrentUser() user: User,
  ): Promise<Report> {
    return await this.service.create(body, user);
  }

  @UseGuards(AdminGuard)
  @Patch('/:id')
  async approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return await this.service.changeApproval(id, body.approved);
  }
}
