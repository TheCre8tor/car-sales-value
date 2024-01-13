import { IsEmail, IsString } from 'class-validator';

class SigninDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export default SigninDto;
