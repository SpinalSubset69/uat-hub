import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { BaseController } from 'src/common/controllers/baseController';
import { UserToreturnDto } from 'src/modules/users/dtos/user-to-return.dto';
import { Users } from 'src/modules/users/entities/user.entity';
import { LoginDto, SignUpDto } from '../dtos/auth.dtos';
import { AuthService } from '../services/auth.service';

@Controller('api/auth')
export class AuthController extends BaseController {
  constructor(private readonly _authService: AuthService) {
    super();
  }

  @Post('login')
  async Login(@Body() args: LoginDto, @Res() res: Response) {
    try {
      const user = await this._authService.login(args);
      const token = await this._authService.generateUserJwt(user as Users);
      return res.status(200).json({
        message: 'Loged In',
        token,
        user: user,
      });
    } catch (ex: any) {
      return this.handleErrorOnRequest(ex, res);
    }
  }

  @Post('signup')
  async SignUp(@Body() args: SignUpDto, @Res() res: Response) {
    try {
      const savedUser = await this._authService.signup(args);
      const token = await this._authService.generateUserJwt(savedUser as Users);

      return res.status(200).json({
        message: 'Signup Successfully',
        token,
        user: savedUser,
      });
    } catch (ex: any) {
      return this.handleErrorOnRequest(ex, res);
    }
  }
}
