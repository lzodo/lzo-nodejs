import { Injectable } from '@nestjs/common';

/**
 * 业务逻辑部分
 */
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

/**
 * DI容器切片思想，工作原理
 *  1、注册所有 @Injectable 注解的类 【如：AppService】
 *     @module 下 providers 中的类也会注册重点关注【我们正常业务中，类似 AppService 的类就是反正 provider里的】
 *  2、通过 Controller 了解类与类之前的依赖关系【AppController 中 constructor(private readonly appService: AppService) {}】
 *  3、NestJS会自动创建 @Injectable() 注解的类的实例【 AppController 中不需要 new 就能直接使用 】
 *    如果 AppController 下又遇到 @Injectable() 注解的类就重复上面的过程，全部类都储存在DI容器中
 *  4、NestJS 自动创建依赖关系的实例，按需进行调用
 */
