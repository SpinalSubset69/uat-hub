import { IsEmail, IsNotEmpty, IsNotEmptyObject } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateFileDto } from 'src/modules/files/dtos/create-file.dto';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  user_name: string;

  @Type(() => CreateFileDto)
  profile_image: CreateFileDto;
}
