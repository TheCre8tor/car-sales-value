import { Expose } from 'class-transformer';

class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}

export default UserDto;
