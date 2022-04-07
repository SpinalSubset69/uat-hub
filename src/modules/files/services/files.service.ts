import { Injectable } from '@nestjs/common';
import { DataService } from 'src/common/services/generic.service';
import getFilePath, {
  base64_decodeAsync,
  delete_fileAsync,
} from 'src/shared/helpers/files-handler.helper-';
import { FindOneOptions } from 'typeorm';
import { CreateFileDto } from '../dtos/create-file.dto';
import { Files } from '../entities/file.entity';

@Injectable()
export class FilesService extends DataService(Files) {
  public async saveFileAsync(
    userId: number,
    file: CreateFileDto,
  ): Promise<Files> {
    const fileSavedOnServer = await base64_decodeAsync(file);
    return await this.create({ ...fileSavedOnServer, user: userId });
  }

  public async deleteFileAsync(id: number): Promise<boolean> {
    const file = await this.findOne({ id: id });
    await delete_fileAsync(file);
    return await this.delete({ id: id });
  }

  public async getFileAsync(file_name: string) {
    return getFilePath(file_name);
  }
}
