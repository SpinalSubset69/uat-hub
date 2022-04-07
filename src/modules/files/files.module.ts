import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/entities/user.entity';
import { FilesController } from './controllers/files.controller';
import { Files } from './entities/file.entity';
import { FilesService } from './services/files.service';

@Module({
  imports: [TypeOrmModule.forFeature([Files, Users])],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
