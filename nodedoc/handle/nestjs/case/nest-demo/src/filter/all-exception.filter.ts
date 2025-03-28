import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'nestjs-pino';
import * as requestIp from 'request-ip';

// 不设置参数，捕获所有异常
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(@Inject(Logger) private logger: Logger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // 除了 http 异常（有顺序问题，HttpException 过滤要放在后面）
    if (!(exception instanceof HttpException)) {
      // 确定状态码和错误信息
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

      const message =
        exception instanceof Error
          ? exception.message
          : 'Internal server error';

      // 结构化日志记录
      this.logger.error({
        message: message,
        type: exception?.constructor.name, // 异常类型
        statusCode: status,
        path: request.url,
        method: request.method,
        stack: exception instanceof Error ? exception.stack : undefined,
        context: {
          body: request.body,
          query: request.query,
          params: request.params,
        },
      });

      // 返回标准化错误响应
      response.status(status).json({
        statusCode: status,
        message: message,
        timestamp: new Date().toISOString(),
        path: request.url,
        ip: requestIp.getClientIp(request),
      });
    }
  }
}
