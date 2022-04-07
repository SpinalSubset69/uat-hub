import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/services/users.service';
import { jwtConstants } from '../authConstants';
import { LoginDto, SignUpDto } from '../dtos/auth.dtos';
import { IPayload } from '../interfaces/jwt.interfaces';
import * as bcrypt from 'bcrypt';
import { UserToreturnDto } from 'src/modules/users/dtos/user-to-return.dto';
import { base64_decodeAsync } from 'src/shared/helpers/files-handler.helper-';

@Injectable()
export class AuthService {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _jwtService: JwtService,
  ) {}

  public async login(args: LoginDto): Promise<UserToreturnDto> {
    const { email, user_name, profile_image, id, created_at, password, files } =
      await this._usersService.findByEmail(args.email);
    //Compare password
    if (!bcrypt.compareSync(args.password, password))
      throw new UnauthorizedException('Invalid Credentials');
    return { email, user_name, profile_image, id, created_at, files };
  }

  public async signup(args: SignUpDto): Promise<UserToreturnDto> {
    //GENERATE PROFILE IMAGE
    const userProfileImage = await base64_decodeAsync(args.profile_image);
    const { id, email, user_name, files, profile_image, created_at } =
      await this._usersService.createNewUser({
        ...args,
        profile_image: userProfileImage.name_on_server,
      });

    return { id, email, user_name, files, profile_image, created_at };
  }

  public async generateUserJwt(args: Users) {
    const payload: IPayload = { id: args.id, email: args.email };
    return await this._jwtService.signAsync(payload);
  }
}
