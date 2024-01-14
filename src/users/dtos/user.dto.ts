import { Expose } from 'class-transformer';

class UserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;
}

export default UserDto;
