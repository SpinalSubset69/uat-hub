import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Files } from 'src/modules/files/entities/file.entity';

@Entity()
export class Users extends BaseEntity {
  @Column()
  user_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column()
  profile_image: string;

  @Column({ default: new Date() })
  created_at: Date;

  @OneToMany(() => Files, (file) => file.user)
  files: Files[];
}
