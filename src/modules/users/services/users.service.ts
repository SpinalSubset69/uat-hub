import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { DataService } from 'src/common/services/generic.service';
import { Users } from '../entities/user.entity';
import { UserToreturnDto } from '../dtos/user-to-return.dto';

@Injectable()
export class UsersService extends DataService(Users) {
  public async createNewUser(args: CreateUserDto): Promise<Users | null> {
    args.password = bcrypt.hashSync(args.password, 10);
    return await this.create(args);
  }

  public async getUserWithFiles(userId: number): Promise<UserToreturnDto> {
    console.log(userId);
    const { user_name, files, created_at, email, profile_image, id } =
      await this.findOne(
        {
          id: userId,
        },
        {
          relations: ['files'],
        },
      );
    return { user_name, files, created_at, email, profile_image, id };
  }

  public async findByEmail(email: string) {
    return await this.findOne({
      email: email,
    });
  }
}
