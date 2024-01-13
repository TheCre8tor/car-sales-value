import { Expose, Transform } from 'class-transformer';
import { Report } from '../entity/report.entity';

class ReportDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  mileage: number;

  @Transform(({ obj }) => {
    const report: Report = obj as Report;
    return report.user.id;
  })
  @Expose()
  user_id: number;
}

export default ReportDto;
