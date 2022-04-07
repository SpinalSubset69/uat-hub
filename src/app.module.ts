import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './common/database/databaseConfig';
import { FilesModule } from './modules/files/files.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(databaseConfig), FilesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
