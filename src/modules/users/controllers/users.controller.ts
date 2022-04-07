import { Controller, Delete, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { BaseController } from 'src/common/controllers/baseController';
import { JwtAuthguard } from 'src/modules/auth/guards/jwt.auth.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';

@Controller('api/users')
export class UsersController extends BaseController {
  constructor(private readonly _usersService: UsersService) {
    super();
  }

  @Get()
  @UseGuards(JwtAuthguard)
  public async GetCurrentUSer(@CurrentUser() user: User, @Res() res: Response) {
    try {
      return res.status(200).json({
        currentUser: await this._usersService.getUserWithFiles(user.id),
      });
    } catch (ex: any) {
      return this.handleErrorOnRequest(ex, res);
    }
  }

  @Delete()
  @UseGuards(JwtAuthguard)
  public async DeleteUser(@CurrentUser() user: User, @Res() res: Response) {
    try {
    } catch (ex: any) {
      this.handleErrorOnRequest(ex, res);
    }
  }
}
