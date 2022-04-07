import { BaseEntity } from 'src/common/entities/base.entity';
import { Users } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Files extends BaseEntity {
  @Column()
  file_name: string;

  @Column()
  file_type: string;

  @Column()
  path_on_server: string;

  @Column()
  file_size: string;

  @Column({ default: new Date() })
  created_at: Date;

  @Column()
  name_on_server: string;

  @ManyToOne(() => Users, (user) => user.files, { onDelete: 'CASCADE' })
  user: Users;
}
