import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNotEmptyObject } from 'class-validator';
import { CreateFileDto } from 'src/modules/files/dtos/create-file.dto';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  user_name: string;

  @IsNotEmpty()
  profile_image: string;
}
