import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RangerModule } from './ranger/ranger.module';
import { ConfigModule } from '@nestjs/config';
import { MockModule } from './mock/mock.module';
import { GlobalModule } from './common/global/global.module';
import { LoggerModule } from './logs/logger.module';
import { TypeormModule } from './common/typeorm/typeorm.module';
// import Configuration from './config/configuration';
import * as Joi from 'joi';

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
      // load: [Configuration],
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

    TypeormModule,
    LoggerModule,
    UserModule,
    RangerModule,
    MockModule,
    GlobalModule, // 只需在此导入一次
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
