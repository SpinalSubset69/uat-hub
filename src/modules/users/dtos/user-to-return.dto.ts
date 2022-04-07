import { UserFile } from 'src/modules/files/models/files.model';

export class UserToreturnDto {
  id: number;
  user_name: string;
  email: string;
  profile_image: string;
  files: UserFile[];
  created_at: Date;
}
