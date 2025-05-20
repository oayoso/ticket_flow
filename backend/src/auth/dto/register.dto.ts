import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { UserRole } from '../interfaces/user-role.enum';

export class RegisterDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
