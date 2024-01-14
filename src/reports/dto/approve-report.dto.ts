import { IsBoolean } from 'class-validator';

class ApproveReportDto {
  @IsBoolean()
  approved: boolean;
}

export default ApproveReportDto;
