import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/modules/users/services/users.service';
import { jwtConstants } from '../authConstants';
import { IPayload } from '../interfaces/jwt.interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //<-- this is a fuckingg func
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: IPayload) {
    const { id, email, user_name } = await this._usersService.findOne({
      id: payload.id,
    });
    const user = { id, email, user_name };
    console.log(user);
    return user;
  }
}
