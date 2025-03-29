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
import { ConfigEnum } from 'src/enum/config.enum';

// 根据环境加载对应的 .env 文件
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development' }); // 默认加载 .env
} else if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config();
}

export const connnectionParams = {
  type: process.env[ConfigEnum.DB_TYPE],
  host: process.env[ConfigEnum.DB_HOST],
  port: process.env[ConfigEnum.DB_PORT],
  username: process.env[ConfigEnum.DB_ACCOUNT],
  password: process.env[ConfigEnum.DB_PASSWD],
  database: process.env[ConfigEnum.DB_DATABASE],
  // ...其他配置同上面js版本
  entities: [join(__dirname, 'src/**/*.entity{.ts,.js}')], // 动态加载数据库实体模型,.js 是为了兼容生产环境的commonjs文件
  // entities: [User, Logs, Roles, Profile],
  synchronize: process.env[ConfigEnum.DB_SYNC], //  生产环境必须设为 false !
  logging: false,
} as TypeOrmModuleOptions;

export default new DataSource({
  ...connnectionParams,
  migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
} as DataSourceOptions);
