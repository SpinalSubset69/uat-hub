import { UserFile } from 'src/modules/files/models/files.model';

interface IUser {
  id: number;
  user_name: string;
  email: string;
  profile_image: string;
  files: UserFile[];
  created_at: Date;
}

export type User = IUser;
