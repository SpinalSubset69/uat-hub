import { TypeOrmModuleOptions } from '@nestjs/typeorm';
//Should be changed to an .ENV variables on prod
export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'uat_hub',
  username: 'postgres',
  password: 'Resumiendo69%',
  entities: ['dist/**/**/**/*.entity{.ts,.js}'],
  synchronize: true, //DISABLED ON PROD
  retryDelay: 3000,
  retryAttempts: 10,
};
