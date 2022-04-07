import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { response, Response } from 'express';
import { BaseController } from 'src/common/controllers/baseController';
import { JwtAuthguard } from 'src/modules/auth/guards/jwt.auth.guard';
import { User } from 'src/modules/users/models/user.model';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { CreateFileDto } from '../dtos/create-file.dto';
import { FilesService } from '../services/files.service';

@Controller('api/files')
export class FilesController extends BaseController {
  constructor(private readonly _filesService: FilesService) {
    super();
  }

  @Post()
  @UseGuards(JwtAuthguard)
  public async SaveFile(
    @Body() args: CreateFileDto,
    @Res() res: Response,
    @CurrentUser() user: User,
  ) {
    try {
      const fileSaved = await this._filesService.saveFileAsync(user.id, args);
      return res.status(200).json({
        message: 'File Saved',
        data: fileSaved,
      });
    } catch (ex: any) {
      return this.handleErrorOnRequest(ex, response);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthguard)
  public async DeleteFile(@Param('id') id: number, @Res() res: Response) {
    try {
      const isDeleted = await this._filesService.deleteFileAsync(id);
      return res.status(200).json({
        message: 'File Removes',
        data: isDeleted,
      });
    } catch (ex: any) {
      return this.handleErrorOnRequest(ex, res);
    }
  }

  @Get(':name')
  public async GetImage(
    @Param('name') file_name: string,
    @Res() res: Response,
  ) {
    try {
      const file = await this._filesService.getFileAsync(file_name);
      console.log(file);
      res.status(200).sendFile(file);
    } catch (ex: any) {
      return this.handleErrorOnRequest(ex, res);
    }
  }

  @Get('download/:name')
  public async DownloadFile(
    @Param('name') file_name: string,
    @Res() res: Response,
  ) {
    try {
      const file = await this._filesService.getFileAsync(file_name);
      res.status(200).download(file);
    } catch (ex: any) {
      return this.handleErrorOnRequest(ex, res);
    }
  }
}
