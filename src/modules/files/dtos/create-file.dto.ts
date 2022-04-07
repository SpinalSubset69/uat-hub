import { IsNotEmpty } from 'class-validator';

export class CreateFileDto {
  @IsNotEmpty()
  file_name: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  file_type: string;
}
