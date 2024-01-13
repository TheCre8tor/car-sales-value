import { IsBoolean } from 'class-validator';

class ApproveReportDto {
  @IsBoolean()
  approve: boolean;
}

export default ApproveReportDto;
