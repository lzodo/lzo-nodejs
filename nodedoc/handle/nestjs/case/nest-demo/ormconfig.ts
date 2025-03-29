// ormconfig.ts
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { User } from 'src/user/entity/user.entity';
// import { Logs } from 'src/logs/entity/logs.entity';
// import { Roles } from 'src/roles/entity/roles.entity';
// import { Profile } from 'src/user/entity/profile.entity';

// 读取环境变量
import * as dotenv from 'dotenv';
import { ConfigEnum } from './src/enum/config.enum';

// 根据环境加载对应的 .env 文件

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development' }); // 默认加载 .env
} else if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config();
}

console.log(process.env.NODE_ENV, typeof process.env[ConfigEnum.DB_SYNC]);
export const connnectionParams = {
  type: process.env[ConfigEnum.DB_TYPE],
  host: process.env[ConfigEnum.DB_HOST],
  port: process.env[ConfigEnum.DB_PORT],
  username: process.env[ConfigEnum.DB_ACCOUNT],
  password: process.env[ConfigEnum.DB_PASSWD],
  database: process.env[ConfigEnum.DB_DATABASE],
  // 动态加载数据库实体模型,.js 是为了兼容生产环境的commonjs文件
  entities: [join(__dirname, './src/**/*.entity{.ts,.js}')],
  // entities: [User, Logs, Roles, Profile],
  //  生产环境必须设为 false,通常不希望自动修改数据库架构，除非你明确执行迁移或手动更改数据库
  synchronize: process.env[ConfigEnum.DB_SYNC] == 'true',
  logging: false,
} as TypeOrmModuleOptions;

export default new DataSource({
  ...connnectionParams,
  // 迁移文件目录
  migrations: [join(__dirname, 'src/migrations/*{.ts,.js}')],
} as DataSourceOptions);
