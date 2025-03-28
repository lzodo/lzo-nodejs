import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { Module } from '@nestjs/common';
import { join } from 'path';

@Module({
  imports: [
    PinoLoggerModule.forRoot({
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
                file: join('logs', 'log.info.txt'), // 日志输出文件位置
                frequency: 'daily',
                size: '5m', // 文件滚动，日志文件不会超过5m
                mkdir: true, // 自动创建文件夹
              },
            },
            {
              level: 'error',
              target: 'pino-roll',
              options: {
                file: join('logs', 'log.error.txt'), // 日志输出文件位置
                frequency: 'daily',
                size: '5m', // 文件滚动，日志文件不会超过5m
                mkdir: true, // 自动创建文件夹
              },
            },
          ],
        },
      },
    }),
  ],
})
export class LoggerModule {}
