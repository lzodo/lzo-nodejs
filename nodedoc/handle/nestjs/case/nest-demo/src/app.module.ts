import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RangerModule } from './ranger/ranger.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import Configuration from './config/configuration';
import * as Joi from 'joi';
import { ConfigEnum } from './enum/config.enum';
import { User } from './user/entity/user.entity';
import { Roles } from './roles/entity/roles.entity';
import { Logs } from './logs/entity/logs.entity';
import { Profile } from './user/entity/profile.entity';
import { MockModule } from './mock/mock.module';
import { LoggerModule } from 'nestjs-pino';
import { join } from 'path';
import { mkdir } from 'fs';

/**
 * nestjs 中所有东西都与模块相关联，所有服务，路由都是模块的分支
 * 最终 main.js 也是从这里导入使用
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      // 全局使用，其他模块使用就不需要 imports 中配置 ConfigModule 了
      isGlobal: true,
      // 前面的优先级高，.env 的配置进行共享
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      // 如果使用yml配置文件复杂数据
      load: [Configuration],
      // 环境变量校验
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production'),

        DB_TYPE: Joi.string().valid('mysql', 'mariadb'),
        DB_HOST: Joi.string().ip().required(),
        DB_PORT: Joi.number().default(3306),
        DB_ACCOUNT: Joi.string().required(),
        DB_PASSWD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_SYNC: Joi.boolean().default(false),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get(ConfigEnum.DB_TYPE),
          host: configService.get(ConfigEnum.DB_HOST),
          port: configService.get(ConfigEnum.DB_PORT),
          username: configService.get(ConfigEnum.DB_ACCOUNT),
          password: configService.get(ConfigEnum.DB_PASSWD),
          database: configService.get(ConfigEnum.DB_DATABASE),
          entities: [User, Roles, Logs, Profile],
          // 同步，不应在生产中使用 - 否则你可能会丢失生产数据。
          synchronize: configService.get(ConfigEnum.DB_SYNC),
          // logging: ['error'],
          // 关闭 TypeORM 日志
          logging: false,
        }) as TypeOrmModuleOptions,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          // target: 'pino-pretty',
          // options: {
          //   colorize: true,
          // },
          targets: [
            {
              level: 'info',
              target: 'pino-roll',
              options: {
                file: join('logs', 'log.txt'), // 日志输出文件位置
                frequency: 'daily',
                size: '5m', // 文件滚动，日志文件不会超过5m
                mkdir: true, // 自动创建文件夹
              },
            },
          ],
        },
      },
    }),
    UserModule,
    RangerModule,
    MockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
