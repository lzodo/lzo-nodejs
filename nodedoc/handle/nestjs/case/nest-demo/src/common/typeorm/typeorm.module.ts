import { Module } from '@nestjs/common';
// import { ConfigEnum } from 'src/enum/config.enum';
// import { User } from 'src/user/entity/user.entity';
// import { Roles } from 'src/roles/entity/roles.entity';
// import { Logs } from 'src/logs/entity/logs.entity';
// import { Profile } from 'src/user/entity/profile.entity';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import DataSourceOptionsParams, { connnectionParams } from '../../../ormconfig';

/**
 * TypeORM 0,4 之前可以用 connnectionParams ，0,4 之后必须用 DataSource类型的
 */

@Module({
  imports: [
    TypeOrmModule.forRoot(DataSourceOptionsParams.options),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) =>
    //     ({
    //       type: configService.get(ConfigEnum.DB_TYPE),
    //       host: configService.get(ConfigEnum.DB_HOST),
    //       port: configService.get(ConfigEnum.DB_PORT),
    //       username: configService.get(ConfigEnum.DB_ACCOUNT),
    //       password: configService.get(ConfigEnum.DB_PASSWD),
    //       database: configService.get(ConfigEnum.DB_DATABASE),
    //       entities: [User, Roles, Logs, Profile],
    //       // 同步，不应在生产中使用 - 否则你可能会丢失生产数据。
    //       synchronize: configService.get(ConfigEnum.DB_SYNC),
    //       // logging: ['error'],
    //       // 关闭 TypeORM 日志
    //       logging: false,
    //     }) as TypeOrmModuleOptions,
    // }),
  ],
})
export class TypeormModule {
  constructor(private dataSource: DataSource) {}
}
